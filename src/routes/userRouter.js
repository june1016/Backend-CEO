import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getTotalUsers
  } from "../app/controller/user/userController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";
  
  /**
   * Routes for user management in Fastify.
   *
   * @param {Object} fastify - Fastify framework instance.
   *
   * @author Juan Sebastian Gonzalez Sossa
   * @date   06-02-2025
   */
  const userRouter = async (fastify) => {
    fastify.get("/", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getAllUsers
    });
  
    fastify.get("/:id", {
        preValidation: [
            authenticateDatabase,
            verifyJwt
        ],
      handler: getUserById
    });
  
    fastify.post("/:id", {
        preValidation: [
            authenticateDatabase,
            verifyJwt
        ],
      handler: updateUser
    });
  
    fastify.post("/delete-user", {
      preValidation: [
        authenticateDatabase, 
        verifyJwt
      ],
      handler: deleteUser,
    });
  
    fastify.get("/all", {
        preValidation: [
            authenticateDatabase,
            verifyJwt
        ],
      handler: getTotalUsers
    });
  };
  
  export default userRouter;
  