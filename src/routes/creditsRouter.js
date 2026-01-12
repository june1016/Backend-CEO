
  import { getPendingCredits, markCreditAsPaid } from '../app/controller/credits/creditController.js';
  import authenticateDatabase from '../shared/functions/authenticateDataBase.js';
  import verifyJwt from '../shared/hooks/verifyToken.js';

  /**
   * Routes for managing credits (manual simulation).
   *
   * @param {Object} fastify - Fastify instance.
   *
   * @author
   * @date   29-06-2025
   */
  const creditsRouter = async (fastify) => {
    fastify.post('/mark-as-paid', {
      preValidation: [authenticateDatabase, verifyJwt],
      handler: markCreditAsPaid,
    });

    fastify.get('/get-pending', {
      preValidation: [authenticateDatabase, verifyJwt],
      handler: getPendingCredits,
    });
  };

  export default creditsRouter;
