import {
  getInitialSalesCosts,
  getSalesCostsByCreatedBy,
  createSalesCosts,
} from "../app/controller/planning/salesCostController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for sales costs management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const salesCostRouter = async (fastify) => {
  fastify.get("/getInitialSalesCosts", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialSalesCosts,
  });

  fastify.get("/getSalesCostsByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getSalesCostsByCreatedBy,
  });

  fastify.post("/createSalesCost", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createSalesCosts,
  });
};

export default salesCostRouter;
