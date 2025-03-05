import { getAllFinancialData } from "../app/controller/financialData/financialDataController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js"; "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";
  
  /**
   * Routes for user management in Fastify.
   *
   * @param {Object} fastify - Fastify framework instance.
   *
   * @author Juan Sebastian Gonzalez Sossa
   * @date   04-03-2025
   */
  const financialDataRouter = async (fastify) => {
    fastify.get("/all", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getAllFinancialData
    });
  };
  
  export default financialDataRouter;
  