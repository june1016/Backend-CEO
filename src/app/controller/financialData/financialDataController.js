import logger from "../../../config/logger.js";
import FinancialData from "../../models/FinancialData.js";
import FinancialTitle from "../../models/FinancialTitle.js";
import FinancialCategory from "../../models/FinancialCategory.js";

const getInitialFinancialData = async (_req, reply) => {
  try {
    const financialDataResult = await FinancialData.findAll({
      attributes: ["id", "amount", "created_at", "updated_at"],
      where: { created_by: 1 },
      include: [
        {
          model: FinancialTitle,
          attributes: ["id", "name"],
          include: {
            model: FinancialCategory,
            attributes: ["id", "name"],
          },
        },
      ],
      logging: false
    });

    const financialData = financialDataResult.map((data) => ({
      id: data.id,
      title: data.FinancialTitle?.name,
      category: data.FinancialTitle?.FinancialCategory?.name,
      amount: data.amount,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      financialData,
    });
  } catch (error) {
    logger.error("Error obteniendo los datos financieros iniciales:", error);
    return reply.code(500).send({
      ok: false,
      message: "Se ha producido un error al intentar obtener los datos financieros iniciales.",
    });
  }
};

export default getInitialFinancialData;
