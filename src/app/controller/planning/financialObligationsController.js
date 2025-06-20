import FinancialObligation from '../../models/financialObligations.js';
import logger from '../../../config/logger.js';

const getInitialFinancialObligations = async (_req, reply) => {
  try {
    const obligationsResult = await FinancialObligation.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const financialObligations = obligationsResult.map((obligation) => ({
      id: obligation.id,
      name: obligation.name,
      value_cop: obligation.value_cop,
      created_at: obligation.created_at,
      updated_at: obligation.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      financialObligations,
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

const getFinancialObligationsByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const obligations = await FinancialObligation.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by },
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      financialObligations: obligations,
    });
  } catch (error) {
    logger.error('Error obteniendo obligaciones financieras por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener las obligaciones financieras.',
    });
  }
};

const createOrUpdateFinancialObligations = async (req, reply) => {
  try {
    const { financialObligations } = req.body;

    if (!Array.isArray(financialObligations) || financialObligations.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los datos de obligaciones financieras.',
      });
    }

    const invalid = financialObligations.some(({ value_cop }) => value_cop < 0);
    if (invalid) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Los valores deben ser mayores o iguales a cero.',
      });
    }

    const processed = [];

    for (const item of financialObligations) {
      const { name, value_cop, created_by } = item;

      const existing = await FinancialObligation.findOne({
        where: { name, created_by },
      });

      if (existing) {
        await existing.update({
          value_cop: Number(value_cop),
          updated_by: created_by,
        });
        processed.push(existing);
      } else {
        const newItem = await FinancialObligation.create({
          name,
          value_cop: Number(value_cop),
          created_by,
          updated_by: created_by,
        });
        processed.push(newItem);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Obligaciones financieras guardadas correctamente.',
      financialObligations: processed,
    });
  } catch (error) {
    logger.error('Error al registrar obligaciones financieras:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al registrar las obligaciones financieras.',
    });
  }
};

export {
  getInitialFinancialObligations,
  getFinancialObligationsByCreatedBy,
  createOrUpdateFinancialObligations
};
