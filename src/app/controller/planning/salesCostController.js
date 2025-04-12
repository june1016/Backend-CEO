import SalesCosts from '../../models/salesCosts.js';
import Products from '../../models/products.js';
import logger from '../../../config/logger.js';

const getInitialSalesCosts = async (_req, reply) => {
  try {
    const salesCostsResult = await SalesCosts.findAll({
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
      message: 'Se ha producido un error al intentar obtener los costos de ventas iniciales.',
    });
  }
};

export {
    getInitialSalesCosts
}