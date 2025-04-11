import { getInitialSales } from "../app/controller/planning/salesController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for sales management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const salesRouter = async (fastify) => {
  fastify.get("/getInitialSales", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialSales,
  });
};

export default salesRouter;
