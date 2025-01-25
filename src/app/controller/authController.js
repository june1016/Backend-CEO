import bcrypt from 'bcryptjs';
import  { Users, UserByRol } from '../models/index.js';
import { generateToken } from '../adapter/tokenAdapter.js';
import { LoginError } from '../../errors/error.js';
import envs from '../../config/envs.js';

/**
 * Handles user authentication by validating the username and password, generating a JWT token, and updating the user with the token.
 *
 * @param {Object} req - Request object containing the user's login details (body) and IP address.
 * @param {Object} reply - Response object used to send the authentication result to the client.
 * @returns {void}
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const authUser = async (req, reply) => {
  const { body } = req;
  const clientIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
  const { gmail, password } = body;

  const user = await Users.findOne({ where: { gmail }, logging: false });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new LoginError();
  }

  const userByRol = await UserByRol.findOne({ where: { user_id: user.id }, logging: false });

  const token = generateToken(envs.JWT_SECRET, user, clientIp, userByRol.rol_id);

  await user.update({ token }, { logging: false, silent: true });

  reply.send({
    ok: true,
    token,
    message: 'User login was successful.'
  });
};

export default authUser;
