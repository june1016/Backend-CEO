import logger from "../../../config/logger.js";
import Products from "../../models/products.js";
import ProjectedSales from "../../models/projectedSales.js";
import SalesBudget from "../../models/salesBudget.js";

const createSalesBudget = async (req, reply) => {
  try {
    const { salesBudget } = req.body;

    if (!Array.isArray(salesBudget) || salesBudget.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere un array con los datos del presupuesto de ventas a registrar."
      });
    }

    const results = [];

    for (const item of salesBudget) {
      const { month_id, growth, decade_1, decade_2, decade_3, created_by } = item;

      let total = decade_1 + decade_2 + decade_3;

      if (total >= 99.5 && total < 100) {
        item.decade_3 += Math.round(100 - total);
      } else if (total !== 100) {
        return reply.code(409).send({
          ok: false,
          statusCode: 409,
          message: `La suma de las tres décadas en el mes ${month_id} debe ser exactamente 100 (actual: ${total}).`
        });
      }

      const existing = await SalesBudget.findOne({
        where: {
          month_id,
          created_by
        },
        logging: false
      });

      if (existing) {
        await existing.update({
          growth,
          decade_1: item.decade_1,
          decade_2: item.decade_2,
          decade_3: item.decade_3,
          updated_by: created_by
        }, { logging: false });

        results.push(existing);
      } else {
        const newBudget = await SalesBudget.create({
          ...item,
          updated_by: created_by
        }, { logging: false });

        results.push(newBudget);
      }
    }

    return reply.code(201).send({
      ok: true,
      statusCode: 201,
      message: "Presupuesto de ventas procesado exitosamente.",
      salesBudget: results
    });

  } catch (error) {
    logger.error("Error registrando presupuesto de ventas:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al intentar registrar el presupuesto de ventas."
    });
  }
};


const getSalesBudgetDetailsByMonth = async (req, reply) => {
  try {
    const { month_id } = req.params;

    const salesBudget = await SalesBudget.findOne({
      where: { month_id },
      attributes: ["growth", "decade_1", "decade_2", "decade_3"],
      logging: false
    });

    if (!salesBudget) {
      return reply.code(404).send({
        ok: false,
        statusCode: 404,
        message: "No se encontraron datos de presupuesto de ventas para el mes especificado."
      });
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Datos de presupuesto de ventas obtenidos correctamente.",
      salesBudget
    });
  } catch (error) {
    logger.error("Error al consultar los datos de presupuesto de ventas:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al intentar consultar los datos de presupuesto de ventas."
    });
  }
};

const createOrUpdateProjectedSales = async (req, reply) => {
  try {
    const { projectedSalesData } = req.body;

    if (!Array.isArray(projectedSalesData) || projectedSalesData.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere un array con las proyecciones de ventas.",
      });
    }

    const createdBy = projectedSalesData[0].created_by;
    const updatedSales = [];

    for (const item of projectedSalesData) {
      const { product_id, quantity } = item;

      const existing = await ProjectedSales.findOne({
        where: {
          product_id,
          created_by: createdBy,
        },
        logging: false
      });

      if (existing) {
        await ProjectedSales.update(
          { quantity, updated_by: createdBy },
          {
            where: { id: existing.id },
            logging: false
          }
        );

        updatedSales.push({
          ...existing.toJSON(),
          quantity,
          updated_by: createdBy
        });
      } else {
        const newSale = await ProjectedSales.create({
          product_id,
          quantity,
          created_by: createdBy,
          updated_by: createdBy,
        });
        updatedSales.push(newSale);
      }
    }

    return reply.code(201).send({
      ok: true,
      statusCode: 201,
      message: 'Proyecciones de ventas registradas/actualizadas exitosamente.',
      data: updatedSales,
    });
  } catch (error) {
    logger.error('Error en crear/actualizar proyecciones de ventas:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error interno al registrar las proyecciones de ventas.',
    });
  }
};

const getProjectedSalesByUser = async (req, reply) => {
  try {
    const userId = req.params.user_id;

    if (!userId) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere el ID del usuario.",
      });
    }

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

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Proyecciones de ventas obtenidas exitosamente.',
      data: sales,
    });
  } catch (error) {
    logger.error('Error al obtener proyecciones de ventas por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error interno al obtener las proyecciones de ventas.',
    });
  }
};

export {
  createSalesBudget,
  getSalesBudgetDetailsByMonth,
  createOrUpdateProjectedSales,
  getProjectedSalesByUser
}