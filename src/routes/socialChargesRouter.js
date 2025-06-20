import {
  getInitialSocialCharges,
  getSocialChargesByCreatedBy,
  createOrUpdateSocialCharges
} from "../app/controller/planning/socialChargesController.js";

import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for social charges management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author
 * @date   2025-06-20
 */
const socialChargesRouter = async (fastify) => {
  fastify.get("/getInitialSocialCharges", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialSocialCharges,
  });

  fastify.get("/getSocialChargesByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getSocialChargesByCreatedBy,
  });

  fastify.post("/createOrUpdateSocialCharges", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createOrUpdateSocialCharges,
  });
};

export default socialChargesRouter;
