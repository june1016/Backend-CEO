import logger from '../../../config/logger.js';
import Rol from '../../models/rol.js';

const getAllRoles = async (req, reply) => {
  try {
    const roles = await Rol.findAll({
      attributes: ['id', 'name_rol'],
      order: [['id', 'ASC']],
      raw: true,
      nest: true,
      logging: false
    });

    return reply.code(200).send({
      ok: true,
      data: roles,
    });

  } catch (error) {
    logger.error(error.message);
    return reply.code(500).send({
      ok: false,
      message: 'Se ha producido un error al intentar obtener los roles.',
    });
  }
};

export {
  getAllRoles
};

