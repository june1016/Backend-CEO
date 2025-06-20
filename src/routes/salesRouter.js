import {
  getInitialSales,
  getSalesByCreatedBy,
  createSales
} from "../app/controller/planning/salesController.js";

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

  fastify.get("/getSalesByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getSalesByCreatedBy,
  });

  fastify.post("/createSales", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createSales,
  });
};

export default salesRouter;
