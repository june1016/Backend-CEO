import { createOrUpdateProjectedSales, createSalesBudget, getProjectedSalesByUser, getSalesBudgetDetailsByMonth } from "../app/controller/preOperation/salesBudgetController.js";
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
  const salesBudgetRouter = async (fastify) => {
    fastify.post('/createSaleBudget', {
      preValidation: [
        authenticateDatabase,
        verifyJwt
      ],  
      handler: createSalesBudget
    });
    
    fastify.get('/getSalesBudget/:month_id', {
      preValidation: [
        authenticateDatabase,
        verifyJwt
      ],
      handler: getSalesBudgetDetailsByMonth
    });

    fastify.post('/createProjectedSales', {
      preValidation: [
        authenticateDatabase,
        verifyJwt
      ],  
      handler: createOrUpdateProjectedSales
    });

    fastify.get('/getProjectSales/:user_id', {
      preValidation: [
        authenticateDatabase,
        verifyJwt
      ],
      handler: getProjectedSalesByUser
    });
  };
  
  export default salesBudgetRouter;
  