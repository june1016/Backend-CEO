import bcrypt from 'bcryptjs';
import  { Users, UserByRol } from '../models/index.js';
import { generateToken } from '../adapter/tokenAdapter.js';
import { registerUserSchema } from '../validations/userValidations.js';
import envs from '../../config/envs.js';
import logger from '../../config/logger.js';

/**
 * Registers a new user in the system.
 *
 * @async
 * @function registerUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing user information.
 * @param {string} req.body.name - The first name of the user.
 * @param {string} req.body.lastName - The last name of the user.
 * @param {string} req.body.gmail - The user's email address.
 * @param {string} req.body.password - The user's password in plain text.
 * @param {Object} reply - The reply object used to send the response.
 * 
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const registerUser = async (req, reply) => {
  const { body } = req;
  const { name, lastName, gmail, password } = body;

  try {
    await registerUserSchema.validate(body, { abortEarly: false });

    const existingUser = await Users.findOne({ where: { gmail }, logging: false });
    if (existingUser) {
      return reply.code(409).send({
        ok: false,
        message: 'The email is already taken.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create(
      { gmail, password: hashedPassword, name, lastName },
      { logging: false }
    );

    await UserByRol.create({ user_id: newUser.id, rol_id: 2 }, { logging: false });

    const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
    const token = generateToken(envs.JWT_SECRET, newUser, clientIp);

    await newUser.update({ token }, { logging: false, silent: true });

    reply.code(201).send({
      ok: true,
      token,
      message: 'User registered successfully.',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return reply.code(400).send({
        ok: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: 'An error occurred while registering the user.',
    });
  }
};


  export default registerUser;
  