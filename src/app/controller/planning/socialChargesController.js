import SocialCharges from '../../models/socialCharges.js';
import logger from '../../../config/logger.js';

const getInitialSocialCharges = async (_req, reply) => {
  try {
    const chargesResult = await SocialCharges.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by: 1 },
      logging: false,
    });

    const socialCharges = chargesResult.map((charge) => ({
      id: charge.id,
      name: charge.name,
      value_cop: charge.value_cop,
      created_at: charge.created_at,
      updated_at: charge.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      socialCharges,
    });
  } catch (error) {
    logger.error('Error obteniendo las cargas sociales iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener las cargas sociales iniciales.',
    });
  }
};

const getSocialChargesByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const charges = await SocialCharges.findAll({
      attributes: ['id', 'name', 'value_cop', 'created_at', 'updated_at'],
      where: { created_by },
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      socialCharges: charges,
    });
  } catch (error) {
    logger.error('Error obteniendo cargas sociales por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener las cargas sociales.',
    });
  }
};

const createOrUpdateSocialCharges = async (req, reply) => {
  try {
    const { socialCharges } = req.body;

    if (!Array.isArray(socialCharges) || socialCharges.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los datos de cargas sociales.',
      });
    }

    const invalid = socialCharges.some(({ value_cop }) => value_cop < 0);
    if (invalid) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Los valores deben ser mayores o iguales a cero.',
      });
    }

    const processed = [];

    for (const item of socialCharges) {
      const { name, value_cop, created_by } = item;

      const existing = await SocialCharges.findOne({
        where: { name, created_by },
      });

      if (existing) {
        await existing.update({
          value_cop: Number(value_cop),
          updated_by: created_by,
        });
        processed.push(existing);
      } else {
        const newItem = await SocialCharges.create({
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
      message: 'Cargas sociales guardadas correctamente.',
      socialCharges: processed,
    });
  } catch (error) {
    logger.error('Error al registrar cargas sociales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al registrar las cargas sociales.',
    });
  }
};

export {
  getInitialSocialCharges,
  getSocialChargesByCreatedBy,
  createOrUpdateSocialCharges
};
