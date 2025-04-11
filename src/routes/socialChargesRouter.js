import { getInitialSocialCharges } from "../app/controller/planning/socialChargesController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for social charges management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const socialChargesRouter = async (fastify) => {
  fastify.get("/getInitialSocialCharges", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialSocialCharges,
  });
};

export default socialChargesRouter;
