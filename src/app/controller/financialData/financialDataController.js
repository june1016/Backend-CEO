import logger from '../../../config/logger.js';
import FinancialData from '../../models/financialData.js';

const getAllFinancialData = async (_req, reply) => {
  try {
    const financialDataResult = await FinancialData.findAll({
        attributes: ['id', 'title', 'category', 'amount', 'initial_amount', 'created_at', 'updated_at']
    });

    const financialData = financialDataResult.map(data => data.dataValues)
  
    return reply.code(200).send({
      ok: true,
      financialData,
    });

  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      ok: false,
      message: 'Se ha producido un error al intentar obtener los datos financiales.',
    });
  }
};

export {
    getAllFinancialData
};
