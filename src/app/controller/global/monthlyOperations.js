import { Op } from "sequelize";
import MonthlyOperation from "../../models/monthlyOperations.js";
import PayrollImprovementsAssignments from "../../models/payrollImprovementsAssignments.js";
import PayrollRoleImprovements from "../../models/payrollRoleImprovements.js";
import PayrollRole from "../../models/payrollRoles.js";
import Products from "../../models/products.js";
import OperationProgress from "../../models/progressOperation.js";
import ProjectedSales from "../../models/projectedSales.js";
import SalesBudget from "../../models/salesBudget.js";
import ProductInventory from "../../models/productInventory.js";

export const getUserIndicators = async (req, reply) => {
    const userId = req.params.user_id;
    const decadeParam = parseInt(req.query.decade, 10);

    try {
        const progress = await OperationProgress.findOne({
            where: { user_id: userId },
            logging: false
        });

        const month_id = progress?.month_id || null;

        const totalSales = await MonthlyOperation.sum('total_cost', {
            where: { user_id: userId, month_id },
            logging: false
        }) || 0;

        const porCobrar = await MonthlyOperation.sum('total_cost', {
            where: {
                user_id: userId,
                month_id,
                credit_days: { [Op.gt]: 0 },
                is_paid: false
            },
            logging: false
        }) || 0;

        const payrollAssignments = await PayrollImprovementsAssignments.findAll({
            where: { created_by: userId },
            include: [
                {
                    model: PayrollRoleImprovements,
                    include: [{ model: PayrollRole }]
                }
            ],
            attributes: ['id', 'quantity'],
            logging: false
        });

        const sellers = payrollAssignments.find(item =>
            item.PayrollRoleImprovement?.PayrollRole?.name?.toLowerCase() === 'vendedor'
        );
        const numSellers = sellers ? sellers.quantity : 1;


        const comisiones = totalSales * 0.01;

        const sales = await ProjectedSales.findAll({
            where: { created_by: userId },
            attributes: ['quantity'],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                },
            ],
            order: [['created_at', 'DESC']],
            logging: false,
        });

        const salesBudget = await SalesBudget.findOne({
            where: { month_id },
            attributes: ["growth", "decade_1", "decade_2", "decade_3"],
            logging: false
        });

        const budgets = await SalesBudget.findAll({
            where: { month_id: { [Op.lte]: month_id } },
            attributes: ["month_id", "growth", "decade_1", "decade_2", "decade_3"],
            order: [['month_id', 'ASC']],
            logging: false
        });

        const growthList = budgets.map(b => parseFloat(b.growth) || 0);

        let growthFactor = 1;
        growthList.forEach(g => {
            growthFactor *= (1 + g / 100);
        });

        const currentBudget = budgets.find(b => b.month_id === month_id);
        const decadePercentage =
            decadeParam === 1 ? parseFloat(currentBudget?.decade_1) || 0
                : decadeParam === 2 ? parseFloat(currentBudget?.decade_2) || 0
                    : parseFloat(currentBudget?.decade_3) || 0;

        const adjustedSales = sales.map(item => {
            const quantity = Number(item.quantity) || 0;
            const adjustedQuantity = Math.round(quantity * growthFactor);
            return {
                productId: item.Product.id,
                productName: item.Product.name,
                originalQuantity: quantity,
                adjustedQuantity
            };
        });

        const productIds = adjustedSales.map(item => item.productId);

        const monthlyGoals = adjustedSales.map(item => {
            const baseQuantity = item.originalQuantity;

            const finalGoal = Math.round(baseQuantity * growthFactor);

            return {
                productId: item.productId,
                productName: item.productName,
                monthlyGoal: finalGoal
            };
        });

        const productOperations = await MonthlyOperation.findAll({
            where: {
                user_id: userId,
                month_id
            },
            attributes: ['product_id', 'total_cost', 'decade'],
            raw: true
        });

        const soldD1Operations = await MonthlyOperation.findAll({
            where: {
                user_id: userId,
                month_id,
                product_id: { [Op.in]: productIds },
                decade: decadeParam
            },
            attributes: ['product_id', 'total_cost', 'quantity'],
            raw: true,
            logging: false
        });

        const inventories = await ProductInventory.findAll({
            where: {
                product_id: { [Op.in]: productIds },
                created_by: userId
            },
            attributes: ['product_id', 'unit_cost', 'quantity', 'base_probability'],
            raw: true,
            logging: false
        });

        // Reales por década
        const totalsByDecade = { 1: 0, 2: 0, 3: 0 };
        productOperations.forEach(op => {
            const decade = op.decade;
            const cost = Number(op.total_cost) || 0;
            if (decade && totalsByDecade[decade] !== undefined) {
                totalsByDecade[decade] += cost;
            }
        });
        const totalMonth = totalsByDecade[1] + totalsByDecade[2] + totalsByDecade[3];

        const percentagesByDecade = {
            1: totalMonth > 0 ? (totalsByDecade[1] / totalMonth) * 100 : 0,
            2: totalMonth > 0 ? (totalsByDecade[2] / totalMonth) * 100 : 0,
            3: totalMonth > 0 ? (totalsByDecade[3] / totalMonth) * 100 : 0
        };

        const productPrices = {};
        productOperations.forEach(op => {
            const pid = op.product_id;
            if (!productPrices[pid]) {
                productPrices[pid] = Number(op.total_cost) || 0;
            }
        });

        const inventoryDataByProduct = {};
        inventories.forEach(item => {
            inventoryDataByProduct[item.product_id] = {
                unit_cost: Number(item.unit_cost) || 0,
                quantity: Number(item.quantity) || 0,
                base_probability: Number(item.base_probability) || 0
            };
        });

        const projectedResults = adjustedSales.map(item => {
            const price = productPrices[item.productId] || 0;
            const total = item.adjustedQuantity * price;
            return {
                ...item,
                price,
                total
            };
        });
        const totalProjectedMonth = projectedResults.reduce((acc, curr) => acc + curr.total, 0);

        const decade1 = parseFloat(salesBudget.decade_1) || 0;
        const decade2 = parseFloat(salesBudget.decade_2) || 0;
        const decade3 = parseFloat(salesBudget.decade_3) || 0;

        const projectedTotalsByDecade = {
            1: Math.round(totalProjectedMonth * (decade1 / 100)),
            2: Math.round(totalProjectedMonth * (decade2 / 100)),
            3: Math.round(totalProjectedMonth * (decade3 / 100)),
        };

        const projectedPercentagesByDecade = {
            1: totalProjectedMonth > 0 ? (projectedTotalsByDecade[1] / totalProjectedMonth) * 100 : 0,
            2: totalProjectedMonth > 0 ? (projectedTotalsByDecade[2] / totalProjectedMonth) * 100 : 0,
            3: totalProjectedMonth > 0 ? (projectedTotalsByDecade[3] / totalProjectedMonth) * 100 : 0
        };


        const ventasChange = totalProjectedMonth > 0
            ? ((totalMonth - totalProjectedMonth) / totalProjectedMonth) * 100
            : 0;

        const changePorCobrar = totalMonth > 0
            ? (porCobrar / totalMonth) * 100
            : 0;

        const productData = monthlyGoals.map(goal => {
            const inventory = inventoryDataByProduct[goal.productId] || {};
            const price = inventory.unit_cost || 0;
            const stock = inventory.quantity || 0;
            const baseProbability = inventory.base_probability || 0.05;

            const soldD1 = soldD1Operations
                .filter(op => op.product_id === goal.productId)
                .reduce((acc, op) => acc + Number(op.quantity || 0), 0);

            return {
                name: goal.productName,
                unitPrice: price,
                monthlyGoal: goal.monthlyGoal,
                soldD1,
                stock
            };
        });

        const indicators = [
            {
                key: "ventasActuales",
                title: "Ventas Actuales",
                value: parseFloat(totalMonth),
                change: parseFloat(ventasChange.toFixed(2)),
            },
            {
                key: "vendedores",
                title: "Vendedores",
                value: numSellers,
                change: numSellers,
            },
            {
                key: "porCobrar",
                title: "Por Cobrar",
                value: parseFloat(porCobrar),
                change: parseFloat(changePorCobrar),
            },
            {
                key: "comisiones",
                title: "Comisiones",
                value: parseFloat(comisiones),
                change: +1,
            }
        ];

        return reply.status(200).send({
            message: 'Indicadores generados correctamente',
            indicators,
            totalsByDecade,
            totalMonth,
            totalProjectedMonth,
            projectedTotalsByDecade,
            numSellers,
            productData
        });

    } catch (error) {
        console.error('Error al obtener indicadores:', error.message);
        return reply.status(500).send({ message: 'Error interno', error: error.message });
    }
};
