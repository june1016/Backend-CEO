import PersonnelExpenses from '../../models/personnelExpenses.js';
import logger from '../../../config/logger.js';

const getInitialPersonnelExpenses = async (_req, reply) => {
  try {
    const personnelResult = await PersonnelExpenses.findAll({
      attributes: ['id', 'name', 'quantity', 'value_cop', 'note', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const personnelExpenses = personnelResult.map((expense) => ({
      id: expense.id,
      name: expense.name,
      quantity: expense.quantity,
      value_cop: expense.value_cop,
      note: expense.note,
      created_at: expense.created_at,
      updated_at: expense.updated_at,
    }));

    return reply.code(200).send({
      ok: true, 
      statusCode: 200,
      personnelExpenses,
    });
  } catch (error) {
    logger.error('Error obteniendo los gastos de personal iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener los gastos de personal iniciales.',
    });
  }
};

export {
    getInitialPersonnelExpenses
}

