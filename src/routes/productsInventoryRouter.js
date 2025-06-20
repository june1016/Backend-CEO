import {
  getInitialProductInventory,
  getProductInventoryByUser,
  createProductInventory
} from "../app/controller/planning/productsInventoryController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for product inventory management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   17-06-2025
 */
const productInventoryRouter = async (fastify) => {
  fastify.get("/getInitialProductInventory", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialProductInventory,
  });

  fastify.get("/getProductInventoryByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getProductInventoryByUser,
  });

  fastify.post("/createProductInventory", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createProductInventory,
  });
};

export default productInventoryRouter;
