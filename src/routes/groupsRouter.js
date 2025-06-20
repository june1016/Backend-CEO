import {
  getGroupsWithStudents,
  createGroup,
  updateGroup,
  deleteGroup
} from "../app/controller/groups/groupsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for financial obligations management in Fastify.
 *
 * @param {Object} fastify - Fastify framework instance.
 *
 * @author Juan Sebastian Gonzalez Sossa
 * @date   26-05-2025
 */
const groupsRouter = async (fastify) => {
  fastify.get("/getGroupsWithStudents", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getGroupsWithStudents,
  });

  fastify.post("/create", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: createGroup,
  });

  fastify.post("/update/:id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: updateGroup,
  });

  fastify.post("/delete/:id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: deleteGroup,
  });
};

export default groupsRouter;