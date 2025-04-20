import { getCatalogsByProvider } from "../app/controller/preOperation/catalogsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for catalogs by provider in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 * 
   * @author Juan Sebastian Gonzalez Sossa
   * @date   04-03-2025
 */
const catalogRouter = async (fastify) => {
  fastify.get("/getcatalogs/:provider_id", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: getCatalogsByProvider
  });
};

export default catalogRouter;
