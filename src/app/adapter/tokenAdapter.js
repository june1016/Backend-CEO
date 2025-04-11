import jwt from 'jsonwebtoken';
import { envs } from '../../config/index.js';
import { UnauthorizedError } from '../../errors/error.js';
import Users from '../models/users.js';
import logger from '../../config/logger.js';

/**
 * Generates a JWT token containing the user's ID, IP address, and project ID.
 * The token is signed using a secret key and has an expiration time defined in environment variables.
 *
 * @param {string} seed - secret seed for generate JWT.
 * @param {Object} user - Object containing user information.
 * @param {string} ip - User's IP address for security and tracking purposes.
 * @param {string} projectId - ID of the project for which the token is generated.
 * @returns {string} JWT token.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const generateToken = (seed, user, ip, roleId) => jwt.sign({ id: user?.id, ip, roleId }, seed, {
  expiresIn: envs.TIME_EXPIRED
});

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JSON Web Token (JWT) to be verified.
 * @returns {Object|Error} Decoded token data if valid, or an error if verification fails.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET);
    return decoded;
  } catch (error) {
    logger.error(error);
    throw new UnauthorizedError('Invalid token');
  }
};

/**
 * Logs out a user by invalidating their session token in the database.
 *
 * @param {number|string} userId - The unique identifier of the user to log out.
 * @returns {Promise<void>} - Resolves when the user's token is successfully cleared.
 *
 * @throws {Error} - Throws an error if updating the user's token in the database fails.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const logout = async (decodedToken) => {
  try {
    const invalidToken = '';
    await Users.update(
      { token: invalidToken },
      {
        where: { id: decodedToken.id },
        logging: false
      }
    );
  } catch (error) {
    logger.error(error);
  }
};


export {
  generateToken,
  verifyToken,
  logout
}