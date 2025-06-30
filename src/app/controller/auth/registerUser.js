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
    // 1️⃣ Validación de esquema
    await registerUserSchema.validate(req.body, { abortEarly: false });

    // 2️⃣ Verificar si ya existe
    const existingUser = await Users.findOne({ where: { email }, logging: false });
    if (existingUser) {
      return reply.code(409).send({
        ok: false,
        message: 'El correo ya está en uso.',
      });
    }

    // 3️⃣ Creamos el usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create(
      { email, password: hashedPassword, name, lastName },
      { logging: false }
    );

    // 4️⃣ Asignamos rol = 3 (Estudiante)
    await UserByRol.create(
      { user_id: newUser.id, rol_id: 3 },
      { logging: false }
    );

    // 5️⃣ Leemos el nombre del rol en camelCase
    const rolRecord = await Rol.findByPk(3, {
      attributes: ['nameRol'],
      logging: false,
    });
    const nameRol = rolRecord ? rolRecord.nameRol : null;

    // 6️⃣ Generamos token
    const clientIp =
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.ip;
    const token = generateToken(envs.JWT_SECRET, newUser, clientIp);

    // 7️⃣ Guardamos token en la tabla
    await newUser.update({ token }, { logging: false, silent: true });

    // 8️⃣ Respondemos incluyendo rolId y nameRol
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
