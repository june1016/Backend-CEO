import logger from '../../../config/logger.js';
import Users from '../../models/users.js';
import UserByRol from '../../models/userByRol.js';
import Rol from '../../models/rol.js';

const getAllUsers = async (req, reply) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Users.findAndCountAll({
      attributes: ['id', 'name', 'email', 'lastName', 'created_at', 'updated_at'],
      include: [
        {
          model: UserByRol,
          attributes: [],
          include: [
            {
              model: Rol,
              attributes: ['name_rol'],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const users = rows.map(user => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      rol: user.UserByRols?.Rol?.name_rol || 'Sin rol',
      createdAt: user.created_at.toISOString().split('T')[0],
      updatedAt: user.updated_at?.toISOString().split('T')[0],
    }));

    return reply.code(200).send({
      ok: true,
      data: {
        users,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit),
        },
      },
    });

  } catch (error) {
    logger.error(error.message);
    reply.code(500).send({
      ok: false,
      message: 'Se ha producido un error al intentar obtener los usuarios.',
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
    const { name, lastName, email, rol } = req.body;

    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return reply.code(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    if (email && email !== user.email) {
      const existingUser = await Users.findOne({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        return reply.code(409).send({
          ok: false,
          message: "Ya existe un usuario con ese correo electrónico",
        });
      }
    }

    await user.update({ name, lastName, email });

    const userByRol = await UserByRol.findOne({ where: { user_id: user.id } });

    if (userByRol) {
      await userByRol.update({ rol_id: rol });
    } else {
      await UserByRol.create({ user_id: user.id, rol_id: rol });
    }

    const rolName = await Rol.findOne({
      where: { id: rol },
      attributes: ['name_rol'],
      raw: true,
      nest: true,
    });

    return reply.code(200).send({
      ok: true,
      message: "Usuario actualizado correctamente",
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        rol: rolName?.name_rol || 'Sin rol',
        createdAt: user.created_at.toISOString().split('T')[0],
        updatedAt: user.updated_at?.toISOString().split('T')[0],
      },
    });

  } catch (error) {
    logger.error(error.message);
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

const createUser = async (req, reply) => {
  try {
    const { name, lastName, email, password, rol } = req.body;

    if (!name || !lastName || !email || !password || !rol) {
      return reply.code(400).send({
        ok: false,
        message: "Todos los campos son obligatorios (name, lastName, email, password, rol)",
      });
    }

    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return reply.code(409).send({
        ok: false,
        message: "Ya existe un usuario con ese correo electrónico",
      });
    }

    const newUser = await Users.create({ name, lastName, email, password });

    await UserByRol.create({
      user_id: newUser.id,
      rol_id: rol,
    });

    const rolName = await Rol.findOne({
      where: { id: rol },
      attributes: ['name_rol'],
      raw: true,
      nest: true,
    });

    return reply.code(201).send({
      ok: true,
      message: "Usuario creado correctamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        rol: rolName?.name_rol || 'Sin rol',
        createdAt: newUser.created_at.toISOString().split('T')[0],
        updatedAt: newUser.updated_at?.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    logger.error(error.message);
    reply.code(500).send({
      ok: false,
      message: "Error al crear el usuario",
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
  createUser,
  getTotalUsers
}
