import { createAnnualObjectiveIndicators, getInitialAnnualObjectiveIndicators } from "../app/controller/annualObjectiveIndicators/annualObjectiveIndicatorsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js"; "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";
  
  /**
   * Routes for user management in Fastify.
   *
   * @param {Object} fastify - Fastify framework instance.
   *
   * @author Juan Sebastian Gonzalez Sossa
   * @date   21-03-2025
   */
  const annualObjectiveIndicatorsRouter = async (fastify) => {
    fastify.get("/initialindicators", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getInitialAnnualObjectiveIndicators
    });

    fastify.post('/createindicators', {
      preValidation: [
        authenticateDatabase,
        verifyJwt
      ],
      handler: createAnnualObjectiveIndicators
    });
  };
  
  export default annualObjectiveIndicatorsRouter;
  