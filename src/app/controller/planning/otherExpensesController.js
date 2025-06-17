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

const createOtherExpenses = async (req, reply) => {
  try {
    const { otherExpenses } = req.body;

    if (!Array.isArray(otherExpenses) || otherExpenses.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere un array con los otros gastos a registrar.",
      });
    }

    const invalidValues = otherExpenses.some(({ value_cop }) => value_cop <= 0);

    if (invalidValues) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El valor no puede ser menor o igual a 0.",
      });
    }

    const processedData = [];

    for (const expense of otherExpenses) {
      const { concept, value_cop, created_by } = expense;

      const existing = await OtherExpenses.findOne({
        where: { concept, created_by },
        logging: false,
      });

      if (existing) {
        await existing.update({
          value_cop,
          updated_by: created_by,
        });
        processedData.push(existing);
      } else {
        const newExpense = await OtherExpenses.create({
          concept,
          value_cop,
          created_by,
          updated_by: created_by,
        });
        processedData.push(newExpense);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Otros gastos registrados exitosamente.",
      otherExpenses: processedData,
    });
  } catch (error) {
    logger.error("Error registrando otros gastos:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al registrar otros gastos.",
    });
  }
};

const getOtherExpensesByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const otherExpensesResult = await OtherExpenses.findAll({
      where: { created_by },
      attributes: ['id', 'concept', 'value_cop', 'created_at', 'updated_at'],
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
    logger.error("Error consultando otros gastos por created_by:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al consultar otros gastos por created_by.",
    });
  }
};

export {
    getInitialOtherExpenses,
    createOtherExpenses,
    getOtherExpensesByCreatedBy
}
