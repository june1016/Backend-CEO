import { getInitialProductInventory } from "../app/controller/planning/inventaryProduct.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for inventory products management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const inventoryProductsRouter = async (fastify) => {
  fastify.get("/getInitialInventoryProducts", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialProductInventory,
  });
};

export default inventoryProductsRouter;
