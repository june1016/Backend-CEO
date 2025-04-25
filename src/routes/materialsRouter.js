import { getMaterialsController } from "../app/controller/preOperation/materialsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for materials with pricing and associated data.
 *
 * @param {Object} fastify - Fastify framework instance.
 * 
 * @author Juan Sebastian Gonzalez Sossa
 * @date   25-04-2025
 */
const materialsRouter = async (fastify) => {
  fastify.get("/all", {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: getMaterialsController,
  });
};

export default materialsRouter;
