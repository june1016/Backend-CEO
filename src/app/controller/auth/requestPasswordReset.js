import crypto from 'crypto';
import { Users } from '../../models/index.js';
import sendResetEmail from '../../services/emailService.js';
import logger from '../../../config/logger.js';

/**
 * Request a password reset by sending a reset token to the user's email.
 * 
 * @async
 * @function
 * @param {Object} req - The request object containing the user's email.
 * @param {Object} reply - The reply object used to send the response.
 * @returns {Promise<void>} Sends a response with a success or error message.
 * @throws {Error} If an error occurs during the process.
 * 
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   23-01-2025
 */
const requestPasswordReset = async (req, reply) => {
  const { email } = req.body;

  if (!email) {
    return reply.code(400).send({
      ok: false,
      message: 'Email is required.',
    });
  }

  try {
    const user = await Users.findOne({ where: { email }, logging: false });
    if (!user) {
      return reply.code(404).send({
        ok: false,
        message: 'Email not found.',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await user.update(
      {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: Date.now() + 900000,
      },
      { logging: false }
    );

    const resetLink = `http://localhost:5173/resetPassword/${resetToken}`;

    await sendResetEmail(user.email, resetLink);

    reply.code(200).send({
      ok: true,
      message: 'Password reset email sent.',
    });
  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: 'An error occurred while requesting password reset.',
    });
  }
};

export { requestPasswordReset };
