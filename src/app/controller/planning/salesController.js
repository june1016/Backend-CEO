import Sales from '../../models/sales.js';
import logger from '../../../config/logger.js';
import Products from '../../models/products.js';

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

export {
    getInitialSales
}