import { createMachineShiftAssignments, getMachineShiftAssignmentsByUser } from "../app/controller/preOperation/machineShiftAssignmentsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for machine shift assignments with product and shift details in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 * 
 * @author Juan Sebastian Gonzalez Sossa
 * @date   20-04-2025
 */
const machineShiftAssignmentRouter = async (fastify) => {
  fastify.get("/machine-shifts/user/:user_id", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: getMachineShiftAssignmentsByUser
  });

  fastify.post("/machine-shifts/create", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: createMachineShiftAssignments
  });
};

export default machineShiftAssignmentRouter;