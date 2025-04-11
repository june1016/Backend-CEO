import { getInitialPersonnelExpenses } from "../app/controller/planning/personnelExpensesController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for personnel expenses management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const personnelExpensesRouter = async (fastify) => {
  fastify.get("/getInitialPersonnelExpenses", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialPersonnelExpenses,
  });
};

export default personnelExpensesRouter;
