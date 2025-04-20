import { getPayrollRolesWithImprovements } from "../app/controller/preOperation/payrollRolesController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for payroll roles with improvements in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 * 
 * @author Juan Sebastian Gonzalez Sossa
 * @date   20-04-2025
 */
const payrollRolesRouter = async (fastify) => {
  fastify.get("/payroll-roles", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: getPayrollRolesWithImprovements
  });
};

export default payrollRolesRouter;
