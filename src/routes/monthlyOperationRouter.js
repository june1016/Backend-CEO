import { 
  getUserIndicators, 
  getUserIndicatorsRecords, 
  getUserSalesRecords
} from "../app/controller/global/monthlyOperations.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for user indicators (ventas, comisiones, etc.)
 * @param {Object} fastify - Fastify framework instance.
 */
const monthlyOperationRouter = async (fastify) => {
  fastify.get("/user-indicators/:user_id", {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: getUserIndicators,
  });

  fastify.get("/user-indicators-records/:user_id", {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: getUserIndicatorsRecords,
  });

  fastify.get("/user-sales-records/:user_id", {
  preValidation: [
    authenticateDatabase,
    verifyJwt,
  ],
  handler: getUserSalesRecords,
});
};

export default monthlyOperationRouter;
