import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectToDatabase, envs } from './config/index.js';
import { getVersion } from './routes/index.js';
import authenticateDatabase from './shared/functions/authenticateDataBase.js';
import { errorHandler, notFoundHandler } from './errors/errorHandler.js';
import verifyJwt from './shared/hooks/verifyToken.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import financialDataRouter from './routes/financialDataRouter.js';
import annualObjectiveIndicatorsRouter from './routes/annualObjectiveIndicators.js';

const initializeApp = async () => {
  const fastify = Fastify({
    logger: false,
  });

    await fastify.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

  fastify.decorate('auth', verifyJwt);
  fastify.register(getVersion, { prefix: '/' });
  fastify.register(authRouter, { prefix: '/auth' });
  fastify.register(userRouter, { prefix: '/users' });
  fastify.register(financialDataRouter, { prefix: '/financialdata' });
  fastify.register(annualObjectiveIndicatorsRouter, { prefix: '/indicatordata' });
  fastify.setNotFoundHandler(notFoundHandler);
  fastify.setErrorHandler(errorHandler);

  await authenticateDatabase();

  await fastify.listen({ port: envs.PORT, host: envs.HOST });
};

initializeApp();
