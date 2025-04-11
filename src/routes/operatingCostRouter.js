import { getInitialOperatingCosts } from "../app/controller/planning/operatingCostController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for operating costs management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const operatingCostRouter = async (fastify) => {
  fastify.get("/getInitialOperatingCosts", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialOperatingCosts,
  });
};

export default operatingCostRouter;
