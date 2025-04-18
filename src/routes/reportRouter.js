import { salesBudgetReport } from '../app/controller/report/salesBudgetReportController.js';
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

const reportRouter = async (fastify) => {
  fastify.post('/salesbudgetreport', {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: salesBudgetReport,
  });
};

export default reportRouter;
