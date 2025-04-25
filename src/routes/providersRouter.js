import { getProviderWithMaterials, saveMaterialsByProvider } from "../app/controller/preOperation/providerController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for providers with their materials and conditions.
 *
 * @param {Object} fastify - Fastify framework instance.
 * 
 * @author Juan Sebastian Gonzalez Sossa
 * @date   25-04-2025
 */
const providerRouter = async (fastify) => {
  fastify.get("/getmaterials/:user_id", {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: getProviderWithMaterials,
  });

  fastify.post("/savematerials/:user_id", {
    preValidation: [
      authenticateDatabase,
      verifyJwt,
    ],
    handler: saveMaterialsByProvider,
  });
};

export default providerRouter;
