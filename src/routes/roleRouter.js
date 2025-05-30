import {
  getAllRoles
} from "../app/controller/rol/rolController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for user management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   30-05-2025
 */
const roleRouter = async (fastify) => {
  fastify.get("/", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: getAllRoles
  });
};

export default roleRouter;
