
import { getTeacherIdByStudent } from "../app/controller/groups/groupsStudensController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for student-group related queries.
 *
 * @param {Object} fastify - Fastify instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   29-06-2025
 */
const groupStudentsRouter = async (fastify) => {
  fastify.get("/get-teacher-id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getTeacherIdByStudent,
  });
};

export default groupStudentsRouter;
