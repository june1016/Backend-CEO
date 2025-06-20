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

const getOperatingCostsByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const result = await OperatingCosts.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by },
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      operatingCosts: result,
    });
  } catch (error) {
    logger.error('Error obteniendo costos operativos por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener los costos operativos.',
    });
  }
};

const createOrUpdateOperatingCosts = async (req, reply) => {
  try {
    const { operatingCosts } = req.body;

    if (!Array.isArray(operatingCosts) || operatingCosts.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los datos de costos operativos.',
      });
    }

    const invalid = operatingCosts.some(({ value_cop }) => value_cop < 0);

    if (invalid) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Los costos deben ser mayores o iguales a cero.',
      });
    }

    const processed = [];

    for (const item of operatingCosts) {
      const { name, value_cop, created_by } = item;

      const existing = await OperatingCosts.findOne({
        where: { name, created_by },
      });

      if (existing) {
        await existing.update({
          value_cop: Number(value_cop),
          updated_by: created_by,
        });
        processed.push(existing);
      } else {
        const newItem = await OperatingCosts.create({
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
      message: 'Costos operativos guardados correctamente.',
      operatingCosts: processed,
    });
  } catch (error) {
    logger.error('Error al registrar costos operativos:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al registrar los costos operativos.',
    });
  }
};

export {
  getInitialOperatingCosts,
  getOperatingCostsByCreatedBy,
  createOrUpdateOperatingCosts
};
