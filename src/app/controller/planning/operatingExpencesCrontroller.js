import OperatingExpenses from '../../models/operatingExpenses.js';
import logger from '../../../config/logger.js';

const getInitialOperatingExpenses = async (_req, reply) => {
  try {
    const operatingExpensesResult = await OperatingExpenses.findAll({
      attributes: ['id', 'type', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const operatingExpenses = operatingExpensesResult.map((expense) => ({
      id: expense.id,
      type: expense.type,
      value_cop: expense.value_cop,
      created_at: expense.created_at,
      updated_at: expense.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      operatingExpenses,
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

const createOperatingExpenses = async (req, reply) => {
  try {
    const { operatingExpenses } = req.body;

    if (!Array.isArray(operatingExpenses) || operatingExpenses.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los gastos operacionales a registrar.',
      });
    }

    const invalidValues = operatingExpenses.some(({ value_cop }) => value_cop <= 0);
    if (invalidValues) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Los valores de los gastos no pueden ser menores o iguales a 0.',
      });
    }

    const processedExpenses = [];

    for (const expense of operatingExpenses) {
      const { type, value_cop, created_by } = expense;

      const existingRecord = await OperatingExpenses.findOne({
        where: { type, created_by },
        logging: false,
      });

      if (existingRecord) {
        await existingRecord.update({
          value_cop,
          updated_by: created_by,
        });
        processedExpenses.push(existingRecord);
      } else {
        const newExpense = await OperatingExpenses.create({
          type,
          value_cop,
          created_by,
          updated_by: created_by,
        });
        processedExpenses.push(newExpense);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Gastos operacionales registrados exitosamente.',
      operatingExpenses: processedExpenses,
    });
  } catch (error) {
    logger.error('Error registrando gastos operacionales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar registrar los gastos operacionales.',
    });
  }
};

const getOperatingExpensesByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const operatingExpensesResult = await OperatingExpenses.findAll({
      attributes: ['id', 'type', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by },
      logging: false,
    });

    const operatingExpenses = operatingExpensesResult.map((expense) => ({
      id: expense.id,
      type: expense.type,
      value_cop: expense.value_cop,
      created_at: expense.created_at,
      updated_at: expense.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      operatingExpenses,
    });
  } catch (error) {
    logger.error("Error buscando gastos operacionales por created_by:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al buscar gastos operacionales por created_by.",
    });
  }
};

export {
  getInitialOperatingExpenses,
  createOperatingExpenses,
  getOperatingExpensesByCreatedBy,
};
