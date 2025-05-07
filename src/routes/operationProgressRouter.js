import { 
  upsertOperationProgress, 
  getOperationProgressByUser, 
  getSimulatedTime, 
  startOperationProgress
 } from "../app/controller/global/operationProgressController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

/**
 * Routes for operation progress tracking.
 * @author 
 * @date 2025-05-02
 */
const operationProgressRouter = async (fastify) => {
  fastify.post("/operation-progress/upsert", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: upsertOperationProgress,
  });

  fastify.post("/operation-progress/start", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: startOperationProgress,
  });

  fastify.get("/operation-progress/user/:user_id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getOperationProgressByUser,
  });

  fastify.get("/operation-progress/time/:user_id", {
    preValidation: [authenticateDatabase, verifyJwt],
    handler: getSimulatedTime,
  });
};

export default operationProgressRouter;
