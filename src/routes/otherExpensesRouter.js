import {
  getInitialOtherExpenses,
  createOtherExpenses,
  getOtherExpensesByCreatedBy
} from "../app/controller/planning/otherExpensesController.js";

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

  fastify.get("/getOtherExpensesByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getOtherExpensesByCreatedBy,
  });

  fastify.post("/createOtherExpenses", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createOtherExpenses,
  });
};

export default otherExpensesRouter;
