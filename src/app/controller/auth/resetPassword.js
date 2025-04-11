import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Users } from '../../models/index.js';
import resetPasswordSchema from '../../validations/resetPasswordSchema.js';
import logger from '../../../config/logger.js';

/**
 * Reset the user's password using a provided token and new password.
 * 
 * @async
 * @function
 * @param {Object} req - The request object containing the password and token.
 * @param {Object} reply - The reply object used to send the response.
 * @returns {Promise<void>} Sends a response with a success or error message.
 * @throws {Error} If validation or database errors occur during the process.
 * 
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   23-01-2025
 */
const resetPassword = async (req, reply) => {
  const { password } = req.body;
  const { token } = req.query;

  try {
    await resetPasswordSchema.validate({ token, password }, { abortEarly: false });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await Users.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
      logging: false,
    });

    if (!user) {
      return reply.code(400).send({
        ok: false,
        message: 'Invalid or expired token.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { logging: false }
    );

    reply.code(200).send({
      ok: true,
      message: 'Password updated successfully.',
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
      message: 'An error occurred while resetting the password.',
    });
  }
};

export { resetPassword };
