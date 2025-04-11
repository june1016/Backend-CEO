import createAnnualObjectiveIndicators from "../app/controller/planning/annualObjectiveIndicatorsController.js";
import getIndicatorTitles from "../app/controller/planning/indicatorTitles.js";
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
    fastify.get("/getIndicatortitles", {
      preValidation: [
        authenticateDatabase,
        verifyJwt
    ],
      handler: getIndicatorTitles
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
  