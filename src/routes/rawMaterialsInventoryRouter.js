import {
  getInitialRawMaterialsInventory,
  getRawMaterialsInventoryByCreatedBy,
  createRawMaterialsInventory
} from "../app/controller/planning/rawMaterialsInventoryController.js";

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
const rawMaterialsInventoryRouter = async (fastify) => {

  fastify.get("/getInitialRawMaterialsInventory", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialRawMaterialsInventory,
  });

  fastify.get("/getRawMaterialsInventoryByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getRawMaterialsInventoryByCreatedBy,
  });

  fastify.post("/createRawMaterialsInventory", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createRawMaterialsInventory,
  });
};

export default rawMaterialsInventoryRouter;
