import {
  getInitialProducts,
  getProductsByCreatedBy,
  createProducts,
} from "../app/controller/planning/productsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for products management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   17-06-2025
 */
const productsRouter = async (fastify) => {
  fastify.get("/getInitialProducts", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialProducts,
  });

  fastify.get("/getProductsByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getProductsByCreatedBy,
  });

  fastify.post("/createProducts", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createProducts,
  });
};

export default productsRouter;
