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

const getPersonnelExpensesByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const result = await PersonnelExpenses.findAll({
      attributes: ['id', 'name', 'quantity', 'value_cop', 'note', 'created_at', 'updated_at'],
      where: { created_by },
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      personnelExpenses: result,
    });
  } catch (error) {
    logger.error('Error obteniendo gastos de personal por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener gastos de personal.',
    });
  }
};

const createOrUpdatePersonnelExpenses = async (req, reply) => {
  try {
    const { personnelExpenses } = req.body;

    if (!Array.isArray(personnelExpenses) || personnelExpenses.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los gastos de personal.',
      });
    }

    const invalid = personnelExpenses.some(({ quantity, value_cop }) =>
      quantity < 0 || value_cop < 0
    );

    if (invalid) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'La cantidad y el valor deben ser mayores o iguales a cero.',
      });
    }

    const processed = [];

    for (const item of personnelExpenses) {
      const { name, created_by, quantity, value_cop, note } = item;

      const existing = await PersonnelExpenses.findOne({
        where: { name, created_by },
      });

      if (existing) {
        await existing.update({
          quantity: Number(quantity),
          value_cop: Number(value_cop),
        });
        processed.push(existing);
      } else {
        const newItem = await PersonnelExpenses.create({
          name,
          quantity: Number(quantity),
          value_cop: Number(value_cop),
          note: note || '',
          created_by,
          updated_by: created_by,
        });
        processed.push(newItem);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Gastos de personal guardados correctamente.',
      personnelExpenses: processed,
    });
  } catch (error) {
    logger.error('Error al guardar gastos de personal:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al guardar gastos de personal.',
    });
  }
};

export {
    getInitialPersonnelExpenses,
    getPersonnelExpensesByCreatedBy,
    createOrUpdatePersonnelExpenses
}

