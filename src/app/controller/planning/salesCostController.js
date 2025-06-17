import SalesCosts from '../../models/salesCosts.js';
import Products from '../../models/products.js';
import logger from '../../../config/logger.js';

const getInitialSalesCosts = async (_req, reply) => {
  try {
    const salesCostsResult = await SalesCosts.findAll({
      attributes: ['id', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      include: [{ model: Products, attributes: ['id', 'name'] }],
      logging: false,
    });

    const salesCost = salesCostsResult.map((cost) => ({
      id: cost.id,
      product_name: cost.Products?.name,
      value_cop: cost.value_cop,
      created_at: cost.created_at,
      updated_at: cost.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      salesCost,
    });
  } catch (error) {
    logger.error('Error obteniendo los costos de ventas iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message:
        'Se ha producido un error al intentar obtener los costos de ventas iniciales.',
    });
  }
};

const getSalesCostsByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const salesCostsResult = await SalesCosts.findAll({
      where: { created_by },
      attributes: ['id', 'value_cop', 'created_at', 'updated_at'],
      include: [{ model: Products, attributes: ['id', 'name'] }],
      logging: false,
    });

    const salesCost = salesCostsResult.map((cost) => ({
      id: cost.id,
      product_id: cost.Product?.id,
      value_cop: cost.value_cop,
      created_at: cost.created_at,
      updated_at: cost.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      salesCost,
    });
  } catch (error) {
    logger.error('Error obteniendo costos de ventas por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al intentar obtener los costos de ventas por usuario.',
    });
  }
};

const createSalesCosts = async (req, reply) => {
  try {
    const { salesCosts } = req.body;

    if (!Array.isArray(salesCosts) || salesCosts.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message:
          'Se requiere un array con los costos de ventas a registrar.',
      });
    }

    const invalidValues = salesCosts.some(({ value_cop }) => value_cop <= 0);
    if (invalidValues) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message:
          'Los valores no pueden ser menores o iguales a 0.',
      });
    }

    const processed = [];

    for (const cost of salesCosts) {
      const { product_id, created_by, value_cop } = cost;

      const existing = await SalesCosts.findOne({
        where: { product_id, created_by },
        logging: false,
      });

      if (existing) {
        await existing.update({
          value_cop,
          updated_by: created_by,
        });
        processed.push(existing);
      } else {
        const newCost = await SalesCosts.create({
          product_id,
          value_cop,
          created_by,
          updated_by: created_by,
        });
        processed.push(newCost);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Costos de ventas registrados exitosamente.',
      salesCosts: processed,
    });
  } catch (error) {
    logger.error('Error registrando costos de ventas:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message:
        'Se ha producido un error al intentar registrar los costos de ventas.',
    });
  }
};

export {
  getInitialSalesCosts,
  getSalesCostsByCreatedBy,
  createSalesCosts,
};
