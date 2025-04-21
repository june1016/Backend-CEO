import { createMachineShiftAssignment, postMachineShiftAssignmentsByUser } from "../app/controller/preOperation/machineShiftAssignmentsController.js";
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
  fastify.post("/machine-shifts/by-user", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: postMachineShiftAssignmentsByUser
  });

  fastify.post("/machine-shifts/create", {
    preValidation: [
      authenticateDatabase,
      verifyJwt
    ],
    handler: createMachineShiftAssignment
  });
};

export default machineShiftAssignmentRouter;