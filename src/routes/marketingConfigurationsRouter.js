import {
    getInitialMarketingConfiguration,
    getMarketingConfigurationByUser,
    upsertMarketingConfiguration
} from "../app/controller/global/marketingConfigurationsController.js";
import authenticateDatabase from "../shared/functions/authenticateDataBase.js";
import verifyJwt from "../shared/hooks/verifyToken.js";

const marketingConfigurationsRouter = async (fastify) => {
    fastify.get("/getMarketingConfigurationInicial", {
        preValidation: [authenticateDatabase, verifyJwt],
        handler: getInitialMarketingConfiguration,
    });

    fastify.get("/getMarketingConfigurationByUser", {
        preValidation: [authenticateDatabase, verifyJwt],
        handler: getMarketingConfigurationByUser,
    });

    fastify.post("/upsertMarketingConfiguration", {
        preValidation: [authenticateDatabase, verifyJwt],
        handler: upsertMarketingConfiguration,
    });
};

export default marketingConfigurationsRouter;
