import logger from '../../../config/logger.js';
import { Users, UserByRol, Rol } from '../../models/index.js';

const getAllUsers = async (_req, reply) => {
  try {
    const usersResult = await Users.findAll({
      attributes: ['id', 'name', 'lastName', 'email', 'created_at', 'updated_at']
    });

    const users = usersResult.map(user => user.dataValues)

    return reply.code(200).send({
      ok: true,
      users,
    });

  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: 'Se ha producido un error al intentar obtener todos los usuarios.',
    });
  }
};

const getUserById = async (req, reply) => {
  try {
    const userResult = await Users.findByPk(req.params.id, {
      attributes: ['id', 'name', 'lastName', 'email', 'created_at', 'updated_at'],
      include: [
        {
          model: UserByRol,
          attributes: ['id', 'user_id', 'rol_id'],
          include: [{ model: Rol, attributes: ["id", "name_rol"] }],
        },
      ]
    });

    if (!userResult) {
      return reply.code(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const user = userResult.dataValues;
    return reply.code(200).send({
      ok: true,
      user
    });

  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: "Error al obtener usuario",
    });
  }
};

const updateUser = async (req, reply) => {
  try {
    const { name, lastName } = req.body;
    const user = await Users.findByPk(req.params.id,{
      attributes: ['id', 'name', 'lastName', 'email', 'created_at', 'updated_at']
    });

    if (!user) {
      return reply.code(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    await user.update({ name, lastName });

    return reply.code(200).send({
      ok: true,
      message: "Usuario actualizado correctamente",
      user: user.dataValues,
    });

  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: "Error al actualizar usuario",
    });
  }
};


const deleteUser = async (req, reply) => {
  try {
    const { id } = req.body;

    if (!id) {
      return reply.code(400).send({
        ok: false,
        message: "ID de usuario requerido",
      });
    }

    const user = await Users.findByPk(id);

    if (!user) {
      return reply.code(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    await user.destroy();

    return reply.code(200).send({
      ok: true,
      message: "Usuario eliminado correctamente",
    });

  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: "Error al eliminar usuario",
    });
  }
};


const getTotalUsers = async (_req, reply) => {
  try {
    const count = await Users.count();

    return reply.code(200).send({
      ok: true,
      totalUsuarios: count,
    });

  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: "Error al obtener el total de usuarios",
    });
  }
};

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getTotalUsers
}
