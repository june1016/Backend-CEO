import OperatingCosts from '../../models/operatingCosts.js';
import logger from '../../../config/logger.js';

const getInitialOperatingCosts = async (_req, reply) => {
  try {
    const operatingCostsResult = await OperatingCosts.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const operatingCosts = operatingCostsResult.map((cost) => ({
      id: cost.id,
      name: cost.name,
      value_cop: cost.value_cop,
      created_at: cost.created_at,
      updated_at: cost.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      operatingCosts,
    });
  } catch (error) {
    logger.error('Error obteniendo los costos operativos iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener los costos operativos iniciales.',
    });
  }
};

export {
  getInitialOperatingCosts
}
