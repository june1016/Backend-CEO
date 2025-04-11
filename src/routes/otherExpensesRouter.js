import { getInitialOtherExpenses } from "../app/controller/planning/otherExpensesController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for other expenses management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const otherExpensesRouter = async (fastify) => {
  fastify.get("/getInitialOtherExpenses", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialOtherExpenses,
  });
};

export default otherExpensesRouter;
