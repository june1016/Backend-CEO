import {
  getInitialOperatingExpenses,
  createOperatingExpenses,
  getOperatingExpensesByCreatedBy
} from "../app/controller/planning/operatingExpencesCrontroller.js";

import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Rutas para la gestión de gastos operacionales.
 *
 * @param {Object} fastify - Instancia de Fastify.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   10-04-2025
 */
const operatingExpencesRouter = async (fastify) => {

  fastify.get("/getInitialOperatingExpenses", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getInitialOperatingExpenses,
  });

  fastify.post("/createOperatingExpenses", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createOperatingExpenses,
  });

  fastify.get("/getOperatingExpensesByCreatedBy", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getOperatingExpensesByCreatedBy,
  });
};

export default operatingExpencesRouter;
