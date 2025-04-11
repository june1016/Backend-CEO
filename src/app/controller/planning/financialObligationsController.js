import FinancialObligation from '../../models/financialObligations.js';
import logger from '../../../config/logger.js';

const getInitialFinancialObligations = async (_req, reply) => {
  try {
    const obligationsResult = await FinancialObligation.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const financial_obligations = obligationsResult.map((obligation) => ({
      id: obligation.id,
      name: obligation.name,
      value_cop: obligation.value_cop,
      created_at: obligation.created_at,
      updated_at: obligation.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      financial_obligations,
    });
  } catch (error) {
    logger.error('Error obteniendo las obligaciones financieras iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener las obligaciones financieras iniciales.',
    });
  }
};

export {
    getInitialFinancialObligations
}
