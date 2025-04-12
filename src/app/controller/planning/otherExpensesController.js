import OtherExpenses from '../../models/otherExpenses.js';
import logger from '../../../config/logger.js';

const getInitialOtherExpenses = async (_req, reply) => {
  try {
    const otherExpensesResult = await OtherExpenses.findAll({
      attributes: ['id', 'concept', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const otherExpenses = otherExpensesResult.map((expense) => ({
      id: expense.id,
      concept: expense.concept,
      value_cop: expense.value_cop,
      created_at: expense.created_at,
      updated_at: expense.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      otherExpenses,
    });
  } catch (error) {
    logger.error('Error obteniendo los otros gastos iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener los otros gastos iniciales.',
    });
  }
};

export {
    getInitialOtherExpenses
}
