import { getProducts } from '../../app/services/productService.js';
import { createMonthlyOperationsBulk, getPayrollAssignmentsForUser, getProgressForUser } from '../../app/services/userService.js';
import { adjustLambdaByPrice, getPoissonRandom, getRandomClient, quantityWeights } from '../../shared/helper/statsUtils.js';

const calculateFinalProbability = (product) => {
    const base = product.base_probability || 0;

    const maxMarketingBonus = 0.08;
    const maxCredit30Bonus = 0.02;
    const maxCredit60Bonus = 0.03;

    const marketingBonus = ((product.investment_percent || 0) / 80) * maxMarketingBonus;
    const creditBonus30 = ((product.credit30 || 0) / 50) * maxCredit30Bonus;
    const creditBonus60 = ((product.credit60 || 0) / 50) * maxCredit60Bonus;

    console.log(marketingBonus, creditBonus30, creditBonus60)

    let final = base + marketingBonus + creditBonus30 + creditBonus60;

    final -= 0.01;

    return Math.min(Math.max(final, 0), 1);
};

const getRandomQuantity = () => {
    const totalWeight = quantityWeights.reduce((sum, q) => sum + q.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;

    for (const q of quantityWeights) {
        cumulative += q.weight;
        if (rand < cumulative) {
            return q.quantity;
        }
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

        const sellers = payrollAssignments.find(
            item => item.PayrollRoleImprovement?.PayrollRole?.name?.toLowerCase() === 'vendedor'
        );
        const numSellers = sellers ? sellers.quantity : 1;

        console.log(numSellers);

        console.log(`👤 Usuario: ${user.id} - ${user.name || 'sin nombre'}`);
        console.log(`📦 Productos asociados (${products.length}):`);

        products.forEach((product) => {
            const probability = calculateFinalProbability(product);
            const maxLambda = 4;
            const lambda = probability * maxLambda;
            const adjustedLambda = adjustLambdaByPrice(lambda, product.unit_cost);

            console.log('lamda:', lambda);
            console.log('lamda ajustada:', adjustedLambda);

            const finalLambda = adjustedLambda * numSellers;

            console.log(`Lambda base: ${lambda.toFixed(2)} | Ajustada por precio: ${adjustedLambda.toFixed(2)} | Ajustada por vendedores: ${finalLambda.toFixed(2)}`);


            const numSales = filterPoissonEvents(finalLambda, probability);

            console.log(`📦 Producto: ${product.name}`);
            console.log(`➡️ Probabilidad final: ${probability.toFixed(2)} | Lambda: ${lambda.toFixed(2)}`);
            console.log(`👤 Probabilidad Cliente: ${client.id}`);
            console.log(`🛒 Ventas confirmadas (filtradas): ${numSales}`);

            for (let i = 0; i < numSales; i++) {
                const quantity = getRandomQuantity();
                const unit_cost = product.unit_cost;
                const total_cost = quantity * unit_cost;

                console.log(`   🔸 Venta #${i + 1}: cantidad = ${quantity}, total = $${total_cost.toFixed(2)}`);

                salesToCreate.push({
                    user_id: user.id,
                    product_id: product.product_id,
                    month_id,
                    client_id: client.id,
                    decade: current_decade,
                    quantity,
                    unit_cost,
                    total_cost,
                });
            }

            console.log('------------------------------------------');
        });

        console.log(`✅ Ventas totales creadas para usuario ${user.id}: ${salesToCreate.length}`);

        if (salesToCreate.length > 0) {
            await createMonthlyOperationsBulk(salesToCreate);
        }
    } catch (error) {
        console.error(`Error al simular ventas para el usuario ${user.id}:`, error);
    }
};
