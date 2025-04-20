import { getMachinesWithDetails } from "../app/controller/preOperation/machineController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for machines with product and specification details in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 * 
 * @author Juan Sebastian Gonzalez Sossa
 * @date   20-04-2025
 */
const machineRouter = async (fastify) => {
  fastify.get("/getmachines/details", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: getMachinesWithDetails
  });
};

export default machineRouter;
