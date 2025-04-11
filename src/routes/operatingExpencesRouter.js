import { getInitialOperatingExpenses } from "../app/controller/planning/operatingExpencesCrontroller.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for operating expenses management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const operatingExpencesRouter = async (fastify) => {
  fastify.get("/getInitialOperatingExpenses", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialOperatingExpenses,
  });
};

export default operatingExpencesRouter;
