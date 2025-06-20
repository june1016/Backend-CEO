
import { createFinancialData, getInitialFinancialData, getFinancialDataByCreatedBy } from "../app/controller/planning/financialDataController.js";
import getFinancialTitles from "../app/controller/planning/financialTitles.js";
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
    fastify.get("/initialdata", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getInitialFinancialData
    });

    fastify.get("/getDatatitles", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getFinancialTitles
    });

    fastify.post('/createfinancialdata', {
      preValidation: [
        authenticateDatabase,
        verifyJwt
      ],
      handler: createFinancialData
    });

    
    fastify.get("/getfinancialdata/by-user", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getFinancialDataByCreatedBy
    });
  };
  
  export default financialDataRouter;
  