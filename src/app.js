import Fastify from 'fastify';
import cors from '@fastify/cors';
import { envs } from './config/index.js';
import { authRouter, getVersion, userRouter, financialDataRouter, annualObjectiveIndicatorsRouter, salesBudgetRouter } from './routes/index.js';
import authenticateDatabase from './shared/functions/authenticateDataBase.js';
import { errorHandler, notFoundHandler } from './errors/errorHandler.js';
import verifyJwt from './shared/hooks/verifyToken.js';


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
  fastify.register(salesBudgetRouter, { prefix: '/salesBudget' });
  fastify.setNotFoundHandler(notFoundHandler);
  fastify.setErrorHandler(errorHandler);

  await authenticateDatabase();

  await fastify.listen({ port: envs.PORT, host: envs.HOST });
};

initializeApp();
