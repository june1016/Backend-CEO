import { getInitialFinancialObligations } from "../app/controller/planning/financialObligationsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for financial obligations management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const financialObligationsRouter = async (fastify) => {
  fastify.get("/getInitialFinancialObligations", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialFinancialObligations,
  });
};

export default financialObligationsRouter;