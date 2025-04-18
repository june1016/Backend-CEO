import Fastify from 'fastify';
import cors from '@fastify/cors';
import { envs } from './config/index.js';
import {
  getVersion,
  authRouter,
  userRouter,
  financialDataRouter,

  // Planning
  annualObjectiveIndicatorsRouter,
  financialObligationsRouter,
  inventoryProductsRouter,
  operatingCostRouter,
  operatingExpensesRouter,
  otherExpensesRouter,
  personnelExpensesRouter,
  rawMaterialsInventoryRouter,
  salesCostRouter,
  salesRouter,
  socialChargesRouter,

  // pre-operation
  salesBudgetRouter
} from './routes/index.js';
import authenticateDatabase from './shared/functions/authenticateDataBase.js';
import { errorHandler, notFoundHandler } from './errors/errorHandler.js';
import verifyJwt from './shared/hooks/verifyToken.js';
import reportRouter from './routes/reportRouter.js';
import inventoryPoliceRouter from './routes/inventoryPoliceRouter.js';


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

  //report
  await fastify.register(reportRouter);

  // Planning
  fastify.register(financialDataRouter, { prefix: '/financialdata' });
  fastify.register(financialObligationsRouter, { prefix: '/financialobligations' });
  fastify.register(annualObjectiveIndicatorsRouter, { prefix: '/indicatordata' });
  fastify.register(inventoryProductsRouter, { prefix: '/inventoryproducts' });
  fastify.register(operatingCostRouter, { prefix: '/operatingcosts' });
  fastify.register(operatingExpensesRouter, { prefix: '/operatingexpenses' });
  fastify.register(otherExpensesRouter, { prefix: '/otherexpenses' });
  fastify.register(personnelExpensesRouter, { prefix: '/personnelexpenses' });
  fastify.register(rawMaterialsInventoryRouter, { prefix: '/rawmaterialsinventory' });
  fastify.register(salesCostRouter, { prefix: '/salescosts' });
  fastify.register(salesRouter, { prefix: '/sales' });
  fastify.register(socialChargesRouter, { prefix: '/socialcharges' });
  fastify.register(inventoryPoliceRouter, { prefix: '/inventorypolice' });

  // pre-operation
  fastify.register(salesBudgetRouter, { prefix: '/salesbudget' });

  fastify.setNotFoundHandler(notFoundHandler);
  fastify.setErrorHandler(errorHandler);

  await authenticateDatabase();

  await fastify.listen({ port: envs.PORT, host: envs.HOST });
};

initializeApp();
