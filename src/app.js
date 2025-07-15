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
import machineRouter from './routes/machineRouter.js';
import payrollRolesRouter from './routes/payrollRolesRouter.js';
import payrollImprovementsAssignmentsRouter from './routes/payrollImprovementsAssignmentsRouter.js';
import machineShiftAssignmentRouter from './routes/machineShiftAssignmentsRouter.js';
import providerRouter from './routes/providersRouter.js';
import materialsRouter from './routes/materialsRouter.js';
import operationProgressRouter from './routes/operationProgressRouter.js';
import groupsRouter from './routes/groupsRouter.js';
import universityRouter from './routes/universityRouter.js';
import roleRouter from './routes/roleRouter.js';
import productsRouter from './routes/productsRouter.js';
import productInventoryRouter from './routes/productsInventoryRouter.js';
import groupStudentsRouter from './routes/groupStudentsRouter.js';
import marketingConfigurationsRouter from './routes/marketingConfigurationsRouter.js';
import runSalesScheduler from './jobs/sales/mainScheduler.js';
import monthlyOperationRouter from './routes/monthlyOperationRouter.js';


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
  fastify.register(roleRouter, { prefix: '/rol' });

  //report
  await fastify.register(reportRouter);

  //global
  fastify.register(operationProgressRouter, { prefix: '/progress' });
  fastify.register(marketingConfigurationsRouter, { prefix: '/marketing' });
  fastify.register(monthlyOperationRouter, { prefix: '/monthlyOperation' });

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
  fastify.register(productsRouter, { prefix: '/products' });
  fastify.register(productInventoryRouter, { prefix: '/productsInventory' });
  fastify.register(salesRouter, { prefix: '/sales' });
  fastify.register(socialChargesRouter, { prefix: '/socialcharges' });

  // pre-operation
  fastify.register(salesBudgetRouter, { prefix: '/salesbudget' });
  fastify.register(inventoryPoliceRouter, { prefix: '/inventorypolice' });
  fastify.register(machineRouter, { prefix: '/machine' });
  fastify.register(payrollRolesRouter, { prefix: '/payrol' });
  fastify.register(payrollImprovementsAssignmentsRouter, { prefix: '/payrol-assig' });
  fastify.register(machineShiftAssignmentRouter, { prefix: '/machineassig' });
  fastify.register(providerRouter, { prefix: '/provider' });
  fastify.register(materialsRouter, { prefix: '/material' });

  // Administrador
  fastify.register(groupsRouter, { prefix: '/groups' });
  fastify.register(groupStudentsRouter, { prefix: '/groupstudents' });
  fastify.register(universityRouter, { prefix: '/university' });

  fastify.setNotFoundHandler(notFoundHandler);
  fastify.setErrorHandler(errorHandler);

  await authenticateDatabase();

  //Ejecuta el cron de ventas simuladas cada minuto
  runSalesScheduler();

  await fastify.listen({ port: envs.PORT, host: envs.HOST });
};

initializeApp();
