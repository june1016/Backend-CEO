import OperatingExpenses from '../../models/operatingExpenses.js';
import logger from '../../../config/logger.js';

const getInitialOperatingExpenses = async (_req, reply) => {
  try {
    const operatingExpensesResult = await OperatingExpenses.findAll({
      attributes: ['id', 'type', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const operating_expenses = operatingExpensesResult.map((expense) => ({
      id: expense.id,
      type: expense.type,
      value_cop: expense.value_cop,
      created_at: expense.created_at,
      updated_at: expense.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      operating_expenses,
    });
  } catch (error) {
    logger.error('Error obteniendo los gastos operacionales iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener los gastos operacionales iniciales.',
    });
  }
};

export {
    getInitialOperatingExpenses
}