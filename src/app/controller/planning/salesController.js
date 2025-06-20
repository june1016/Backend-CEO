import Sales from '../../models/sales.js';
import Products from '../../models/products.js';
import logger from '../../../config/logger.js';

const getInitialSales = async (_req, reply) => {
  try {
    const salesResult = await Sales.findAll({
      attributes: ['id', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      include: [
        {
          model: Products,
          attributes: ['id', 'name'],
        },
      ],
      logging: false,
    });

    const sales = salesResult.map((sale) => ({
      id: sale.id,
      product_name: sale.Products?.name,
      value_cop: sale.value_cop,
      created_at: sale.created_at,
      updated_at: sale.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      sales,
    });
  } catch (error) {
    logger.error('Error obteniendo las ventas iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener las ventas iniciales.',
    });
  }
};

const getSalesByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const salesResult = await Sales.findAll({
      where: { created_by },
      attributes: ['id', 'value_cop', 'created_at', 'updated_at'],
      include: [
        {
          model: Products,
          attributes: ['id', 'name'],
        },
      ],
      logging: false,
    });

    const sales = salesResult.map((sale) => ({
      id: sale.id,
      product_id: sale.Product?.id,
      value_cop: sale.value_cop,
      created_at: sale.created_at,
      updated_at: sale.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      sales,
    });
  } catch (error) {
    logger.error("Error obteniendo ventas por created_by:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al obtener ventas por created_by.",
    });
  }
};

const createSales = async (req, reply) => {
  try {
    const { salesData } = req.body;

    if (!Array.isArray(salesData) || salesData.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere un array con los datos de ventas.",
      });
    }

    const invalidValues = salesData.some(({ value_cop }) => value_cop <= 0);
    if (invalidValues) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Los valores deben ser mayores a 0.",
      });
    }

    const processedSales = [];

    for (const data of salesData) {
      const { product_id, created_by, value_cop } = data;

      const existingSale = await Sales.findOne({
        where: {
          product_id,
          created_by,
        },
        logging: false,
      });

      if (existingSale) {
        await existingSale.update({
          value_cop,
          updated_by: created_by,
        });
        processedSales.push(existingSale);
      } else {
        const newSale = await Sales.create({
          product_id,
          value_cop,
          created_by,
          updated_by: created_by,
        });
        processedSales.push(newSale);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Ventas registradas exitosamente.",
      sales: processedSales,
    });
  } catch (error) {
    logger.error("Error registrando ventas:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al registrar las ventas.",
    });
  }
};

export {
  getInitialSales,
  getSalesByCreatedBy,
  createSales
};
