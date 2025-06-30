// src/app/controller/auth/registerUser.js

import bcrypt from 'bcryptjs';
import { Users, UserByRol, Rol } from '../../models/index.js';
import { generateToken } from '../../adapter/tokenAdapter.js';
import registerUserSchema from '../../validations/userValidations.js';
import envs from '../../../config/envs.js';
import logger from '../../../config/logger.js';

/**
 * Registers a new user in the system.
 */
const registerUser = async (req, reply) => {
  const { name, lastName, email, password } = req.body;

  try {
    await registerUserSchema.validate(req.body, { abortEarly: false });

    const existingUser = await Users.findOne({ where: { email }, logging: false });
    if (existingUser) {
      return reply.code(409).send({
        ok: false,
        message: 'El correo ya está en uso.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create(
      { email, password: hashedPassword, name, lastName },
      { logging: false }
    );

    await UserByRol.create(
      { user_id: newUser.id, rol_id: 3 },
      { logging: false }
    );

    const rolRecord = await Rol.findByPk(3, {
      attributes: ['nameRol'],
      logging: false,
    });
    const nameRol = rolRecord ? rolRecord.nameRol : null;

    const clientIp =
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.ip;
    const token = generateToken(envs.JWT_SECRET, newUser, clientIp);

    await newUser.update({ token }, { logging: false, silent: true });

    return reply.code(201).send({
      ok: true,
      token,
      message: 'Usuario registrado con éxito.',
      user: {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        rolId: 3,
        nameRol,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return reply.code(400).send({
        ok: false,
        message: 'Error de validación.',
        errors: error.errors,
      });
    }
    logger.error(error);
    return reply.code(500).send({
      ok: false,
      message: 'Ocurrió un error al registrar el usuario.',
    });
  }
};

export default registerUser;
