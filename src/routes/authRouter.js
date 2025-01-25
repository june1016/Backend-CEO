import { requestPasswordReset } from '../app/controller/requestPasswordReset .js';
import { resetPassword } from '../app/controller/resetPassword.js';
import authenticateDatabase from '../shared/functions/authenticateDataBase.js';
import { authUser, registerUser } from './../app/controller/index.js'

/**
 * Retrieves the version from environment variables using Fastify.
 * @param {Object} fastify - Fastify framework instance for building web applications.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const authRouter = async (fastify) => {
  fastify.post('/login', {
    preValidation: [
      authenticateDatabase
    ],
    handler: authUser
  });

  fastify.post('/register', {
    preValidation: [
      authenticateDatabase
    ],
    handler: registerUser
  });

  fastify.post('/reset-password-with-gmail', {
    preValidation: [
      authenticateDatabase
    ],
    handler: requestPasswordReset
  });

  fastify.post('/reset-password', {
    preValidation: [
      authenticateDatabase
    ],
    handler: resetPassword
  });
};

export default authRouter;
