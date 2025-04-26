import { createOrUpdateInventoryPolicy, getInventoryPoliciesByUser } from "../app/controller/preOperation/inventaryPoliceController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for raw materials inventory management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const inventoryPoliceRouter = async (fastify) => {
  fastify.post("/createinventorypolice", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createOrUpdateInventoryPolicy,
  });

  fastify.get("/getinventorypolice/:user_id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInventoryPoliciesByUser,
  });
};

export default inventoryPoliceRouter;
