import { Op } from "sequelize";
import MonthlyOperation from "../../models/monthlyOperations.js";
import PayrollImprovementsAssignments from "../../models/payrollImprovementsAssignments.js";
import PayrollRoleImprovements from "../../models/payrollRoleImprovements.js";
import PayrollRole from "../../models/payrollRoles.js";
import Products from "../../models/products.js";
import OperationProgress from "../../models/progressOperation.js";
import ProjectedSales from "../../models/projectedSales.js";
import SalesBudget from "../../models/salesBudget.js";

export const getUserIndicators = async (req, reply) => {
    const userId = req.params.user_id;
    const decadeParam = parseInt(req.query.decade, 10) || 1;

    try {
        const progress = await OperationProgress.findOne({
            where: { user_id: userId },
            logging: false
        });

        const month_id = progress?.month_id || null;

        const totalSales = await MonthlyOperation.sum('total_cost', {
            where: { user_id: userId, month_id }
        }) || 0;

        const porCobrar = await MonthlyOperation.sum('total_cost', {
            where: {
                user_id: userId,
                month_id,
                credit_days: { [Op.gt]: 0 },
                is_paid: false
            }
        }) || 0;

        const payrollAssignments = await PayrollImprovementsAssignments.findAll({
            where: { created_by: userId },
            include: [
                {
                    model: PayrollRoleImprovements,
                    include: [{ model: PayrollRole }]
                }
            ],
            attributes: ['id', 'quantity']
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

        const growth = parseFloat(salesBudget?.growth) || 0;
        console.log("✅ Growth:", growth);

        const adjustedSales = sales.map(item => {
            const quantity = Number(item.quantity) || 0;
            const adjustedQuantity = Math.round(quantity * (1 + growth / 100));
            console.log(`📦 Product ${item.Product.name}: original=${quantity}, adjusted=${adjustedQuantity}`);
            return {
                productId: item.Product.id,
                productName: item.Product.name,
                originalQuantity: quantity,
                adjustedQuantity
            };
        });
        console.log("✅ adjustedSales:", adjustedSales);

        const productIds = adjustedSales.map(item => item.productId);
        console.log("🆔 Product IDs:", productIds);

        // Ventas reales (MonthlyOperation)
        const productOperations = await MonthlyOperation.findAll({
            where: {
                user_id: userId,
                month_id,
                product_id: { [Op.in]: productIds }
            },
            attributes: ['product_id', 'total_cost', 'decade'],
            raw: true
        });
        console.log("📊 productOperations:", productOperations);

        const soldD1Operations = await MonthlyOperation.findAll({
            where: {
                user_id: userId,
                month_id,
                product_id: { [Op.in]: productIds },
                decade: decadeParam
            },
            attributes: ['product_id', 'total_cost'],
            raw: true,
            logging: false
        });

        const soldD1 = soldD1Operations.reduce((acc, op) => acc + Number(op.total_cost || 0), 0);

        // Reales por década
        const totalsByDecade = { 1: 0, 2: 0, 3: 0 };
        productOperations.forEach(op => {
            const decade = op.decade;
            const cost = Number(op.total_cost) || 0;
            console.log(`➡️ Adding cost=${cost} to decade=${decade}`);
            if (decade && totalsByDecade[decade] !== undefined) {
                totalsByDecade[decade] += cost;
            }
        });
        const totalMonth = totalsByDecade[1] + totalsByDecade[2] + totalsByDecade[3];
        console.log("✅ totalsByDecade:", totalsByDecade);
        console.log("📦 totalMonth:", totalMonth);

        const percentagesByDecade = {
            1: totalMonth > 0 ? (totalsByDecade[1] / totalMonth) * 100 : 0,
            2: totalMonth > 0 ? (totalsByDecade[2] / totalMonth) * 100 : 0,
            3: totalMonth > 0 ? (totalsByDecade[3] / totalMonth) * 100 : 0
        };
        console.log("📊 percentagesByDecade:", percentagesByDecade);

        // Precios por producto
        const productPrices = {};
        productOperations.forEach(op => {
            const pid = op.product_id;
            if (!productPrices[pid]) {
                productPrices[pid] = Number(op.total_cost) || 0;
                console.log(`💰 Price for product ${pid}: ${productPrices[pid]}`);
            }
        });
        console.log("✅ productPrices:", productPrices);

        // Ventas proyectadas multiplicadas por precio
        const projectedResults = adjustedSales.map(item => {
            const price = productPrices[item.productId] || 0;
            const total = item.adjustedQuantity * price;
            console.log(`📦 Product ${item.productName}: adjustedQuantity=${item.adjustedQuantity}, price=${price}, total=${total}`);
            return {
                ...item,
                price,
                total
            };
        });
        const totalProjectedMonth = projectedResults.reduce((acc, curr) => acc + curr.total, 0);
        console.log("📦 totalProjectedMonth:", totalProjectedMonth);

        // Proyectadas por década usando salesBudget
        const decade1 = parseFloat(salesBudget.decade_1) || 0;
        const decade2 = parseFloat(salesBudget.decade_2) || 0;
        const decade3 = parseFloat(salesBudget.decade_3) || 0;
        console.log("✅ Decade percentages from salesBudget:", { decade1, decade2, decade3 });

        const projectedTotalsByDecade = {
            1: Math.round(totalProjectedMonth * (decade1 / 100)),
            2: Math.round(totalProjectedMonth * (decade2 / 100)),
            3: Math.round(totalProjectedMonth * (decade3 / 100)),
        };
        console.log("📊 projectedTotalsByDecade:", projectedTotalsByDecade);

        const projectedPercentagesByDecade = {
            1: totalProjectedMonth > 0 ? (projectedTotalsByDecade[1] / totalProjectedMonth) * 100 : 0,
            2: totalProjectedMonth > 0 ? (projectedTotalsByDecade[2] / totalProjectedMonth) * 100 : 0,
            3: totalProjectedMonth > 0 ? (projectedTotalsByDecade[3] / totalProjectedMonth) * 100 : 0
        };
        console.log("📊 projectedPercentagesByDecade:", projectedPercentagesByDecade);

        const ventasChange = totalProjectedMonth > 0
            ? ((totalMonth - totalProjectedMonth) / totalProjectedMonth) * 100
            : 0;

        console.log("📈 Cambio calculado en ventasActuales vs proyectadas:", ventasChange);

        const changePorCobrar = totalMonth > 0
            ? (porCobrar / totalMonth) * 100
            : 0;

        // ✅ Resumen final
        console.log({
            totalsByDecade,
            totalMonth,
            percentagesByDecade,
            totalProjectedMonth,
            projectedTotalsByDecade,
            projectedPercentagesByDecade
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
            percentagesByDecade,
            totalProjectedMonth,
            projectedTotalsByDecade,
            projectedPercentagesByDecade,
            numSellers,
            soldD1
        });

    } catch (error) {
        console.error('Error al obtener indicadores:', error.message);
        return reply.status(500).send({ message: 'Error interno', error: error.message });
    }
};
