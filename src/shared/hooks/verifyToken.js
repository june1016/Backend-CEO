import { verifyToken } from '../../app/adapter/tokenAdapter.js';
import Users from '../../app/models/users.js';
import logger from '../../config/logger.js';
import { UnauthorizedError } from '../../errors/error.js';

/**
 * Verifies if the IP address from the request matches the IP address stored in the user's decoded token.
 *
 * @param {Object} decodedToken - Object containing the decoded token data, including the user's IP and ID.
 * @param {string} requestIp - IP address from the incoming request.
 *  @returns {boolean} Returns `true` if the IPs match, otherwise throws an `UnauthorizedError` ('Invalid token').
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const verifyIpFromToken = async (decodedToken, requestIp) => {
  const { ip } = decodedToken;

  return ip === requestIp;
};

/**
 * Verifies if the provided token matches the token stored in the database for a specific user.
 *
 * @param {Object} decodedToken - The decoded token information containing user details.
 * @param {string} decodedToken.id - The unique identifier of the user extracted from the token.
 * @param {string} token - The authentication token to verify against the database record.
 * @returns {Promise<boolean>} - Returns `true` if the tokens match, `false` otherwise.
 *
 * @throws {Error} - Throws an error if the database check fails or the user is not found.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const verifyTokenInDB = async (decodedToken, token) => {
  try {
    const { id } = decodedToken;
    const user = await Users.findOne({ where: { id }, logging: false });

    return user.token === token;
  } catch (error) {
    logger.error(`Invalid token in Users: ${error}`);
    return false;
  }
};

/**
 * Verifies a JWT token, extracts user and project information, and validates it based on the request's IP address.
 *
 * @param {Object} req - Request object containing HTTP request details such as headers and body.
 * @returns {Object|Error} Decoded token data if valid, or an error if verification fails.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const verifyJwt = async (req) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Missing token');
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    throw new UnauthorizedError('Invalid token');
  }

  const requestIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;

  const isValidIpToken = await verifyIpFromToken(decodedToken, requestIp);

  if (!isValidIpToken) {
    throw new UnauthorizedError('Invalid token');
  }

  const isValidToken = await verifyTokenInDB(decodedToken, token);

  if (!isValidToken) {
    throw new UnauthorizedError('Invalid token');
  }

  req.usersId = decodedToken.id;
  req.projectId = decodedToken.projectId;
};

export default verifyJwt;
