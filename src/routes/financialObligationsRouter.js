import {
  getInitialFinancialObligations,
  getFinancialObligationsByCreatedBy,
  createOrUpdateFinancialObligations
} from "../app/controller/planning/financialObligationsController.js";

import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for financial obligations management in Fastify.
 *
 * @param {Object} fastify - Fastify instance.
 *
 * @author
 * @date   2025-06-20
 */
const financialObligationsRouter = async (fastify) => {
  fastify.get("/getInitialFinancialObligations", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialFinancialObligations,
  });

  fastify.get("/getFinancialObligationsByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getFinancialObligationsByCreatedBy,
  });

  fastify.post("/createOrUpdateFinancialObligations", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createOrUpdateFinancialObligations,
  });
};

export default financialObligationsRouter;
