import { createPayrollImprovementsAssignments, getPayrollForUser, updateAvailableOperators } from "../app/controller/preOperation/payrollImprovementsAssignmentsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

const payrollImprovementsAssignmentsRouter = async (fastify) => {
  fastify.post('/payroll-improvements-assignments', {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: createPayrollImprovementsAssignments,
  });

  fastify.get('/payroll-improvements-assignments/user/:user_id', {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: getPayrollForUser,
  });

  fastify.post('/payroll-improvements-assignments/available', {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: updateAvailableOperators,
  });
};

export default payrollImprovementsAssignmentsRouter;
