import ProductInventory from '../../app/models/productInventory.js';
import { getProducts } from '../../app/services/productService.js';
import { createMonthlyOperationsBulk, getPayrollAssignmentsForUser, getProgressForUser } from '../../app/services/userService.js';
import { adjustLambdaByPrice, getPoissonRandom, getRandomClient, quantityWeights } from '../../shared/helper/statsUtils.js';

const calculateFinalProbability = (product) => {
    const base = product.base_probability || 0;
    const marketingBonus = ((product.investment_percent || 0) / 80) * 0.08;
    const creditBonus30 = ((product.credit30 || 0) / 50) * 0.02;
    const creditBonus60 = ((product.credit60 || 0) / 50) * 0.03;
    let final = base + marketingBonus + creditBonus30 + creditBonus60 - 0.01;
    return Math.min(Math.max(final, 0), 1);
};

const getRandomQuantity = () => {
    const totalWeight = quantityWeights.reduce((sum, q) => sum + q.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;
    for (const q of quantityWeights) {
        cumulative += q.weight;
        if (rand < cumulative) return q.quantity;
    }
    return 1;
};

const filterPoissonEvents = (lambda, probability) => {
    const predicted = getPoissonRandom(lambda);
    let confirmed = 0;
    for (let i = 0; i < predicted; i++) {
        if (Math.random() < probability) confirmed++;
    }
    return confirmed;
};

export const simulateSalesForUser = async (user) => {
    try {
        const progress = await getProgressForUser(user.id);
        if (!progress) return;

        const { month_id, current_decade } = progress;
        const products = await getProducts(user.id);
        const salesToCreate = [];
        const client = await getRandomClient();
        const payrollAssignments = await getPayrollAssignmentsForUser(user.id);
        const sellers = payrollAssignments.find(item =>
            item.PayrollRoleImprovement?.PayrollRole?.name?.toLowerCase() === 'vendedor'
        );
        const numSellers = sellers ? sellers.quantity : 1;

        console.log(`👤 Usuario: ${user.id} - ${user.name || 'sin nombre'}`);
        console.log(`📦 Productos asociados (${products.length}):`);

        // ✅ for...of permite usar await dentro
        for (const product of products) {
            const probability = calculateFinalProbability(product);
            const maxLambda = 4;
            const lambda = probability * maxLambda;
            const adjustedLambda = adjustLambdaByPrice(lambda, product.unit_cost);
            const finalLambda = adjustedLambda * numSellers;
            const numSales = filterPoissonEvents(finalLambda, probability);

            console.log(`📦 Producto: ${product.name}`);
            console.log(`➡️ Probabilidad final: ${probability.toFixed(2)} | Lambda: ${lambda.toFixed(2)}`);
            console.log(`🛒 Ventas confirmadas (filtradas): ${numSales}`);

            // ✅ Traer inventario
            let inventory = await ProductInventory.findOne({
                where: { product_id: product.product_id, created_by: user.id }
            });

            if (!inventory || inventory.quantity <= 0) {
                console.warn(`❌ Sin stock de ${product.name}, se omiten ventas`);
                continue;
            }

            for (let i = 0; i < numSales; i++) {
                const quantity = getRandomQuantity();

                if (inventory.quantity >= quantity && quantity > 0) {
                    inventory.quantity -= quantity;

                    const total_cost = quantity * product.unit_cost;
                    const rand = Math.random();
                    let credit_days = 0;
                    if (rand >= 0.7 && rand < 0.9) credit_days = 30;
                    else if (rand >= 0.9) credit_days = 60;
                    const is_paid = credit_days === 0;
                    const paid_at = is_paid ? new Date() : null;

                    salesToCreate.push({
                        user_id: user.id,
                        product_id: product.product_id,
                        month_id,
                        client_id: client.id,
                        decade: current_decade,
                        quantity,
                        credit_days,
                        unit_cost: product.unit_cost,
                        total_cost,
                        is_paid,
                        paid_at
                    });

                    console.log(`✅ Venta creada: cantidad=${quantity}, stock restante=${inventory.quantity}`);
                } else {
                    console.log(`⚠️ Stock insuficiente para venta: stock=${inventory.quantity}, requerido=${quantity}`);
                }
            }

            // 🔄 Guardar inventario actualizado
            await inventory.save();
            console.log(`📦 Inventario actualizado guardado para ${product.name}`);
            console.log('------------------------------------------');
        }

        console.log(`✅ Total ventas creadas: ${salesToCreate.length}`);
        if (salesToCreate.length > 0) {
            await createMonthlyOperationsBulk(salesToCreate);
        }
    } catch (error) {
        console.error(`Error al simular ventas para el usuario ${user.id}:`, error);
    }
};
