import Fastify from 'fastify';
import { conectionDataBase, envs } from './config/index.js';
import { getVersion } from './routes/index.js';
import authenticateDatabase from './shared/functions/authenticateDataBase.js';
import { errorHandler, notFoundHandler } from './errors/errorHandler.js';
import verifyJwt from './shared/hooks/verifyToken.js';
import authRouter from './routes/authRouter.js';

const initializeApp = async () => {
  const fastify = Fastify({
    logger: false,
  });

  fastify.decorate('auth', verifyJwt);
  fastify.register(getVersion, { prefix: '/' });
  fastify.register(authRouter, { prefix: '/auth' });
  fastify.setNotFoundHandler(notFoundHandler);
  fastify.setErrorHandler(errorHandler);

  await authenticateDatabase();

  await fastify.listen({ port: envs.PORT, host: envs.HOST });
};

initializeApp();
