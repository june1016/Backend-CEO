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

export {
    getInitialSocialCharges
}
