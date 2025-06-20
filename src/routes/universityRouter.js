import {
  getAllUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "../app/controller/groups/universityController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for university management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   26-05-2025
 */
const universityRouter = async (fastify) => {
  fastify.get("/getAll", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getAllUniversities,
  });

  fastify.post("/create", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createUniversity,
  });

  fastify.post("/update/:id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: updateUniversity,
  });

  fastify.post("/delete/:id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: deleteUniversity,
  });
};

export default universityRouter;
