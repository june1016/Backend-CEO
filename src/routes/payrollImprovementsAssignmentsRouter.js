import { createPayrollImprovementsAssignments, getPayrollForUser } from "../app/controller/preOperation/payrollImprovementsAssignmentsController.js";
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
};

export default payrollImprovementsAssignmentsRouter;
