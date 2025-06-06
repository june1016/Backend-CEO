import FinancialTitle from "../../models/financialTitleData.js";
import logger from "../../../config/logger.js";
import FinancialData from "../../models/financialData.js";

const getFinancialTitles = async (req, reply) => {
  try {
    const financialTitles = await FinancialTitle.findAll({
        include: [
          {
            model: FinancialData,
            attributes: ["literal_id"]
          },
        ],
        attributes: ["id", "name"],
        order: [["id", "ASC"]],
        logging: false
      });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Títulos financieros obtenidos exitosamente",
      financialTitles: financialTitles,
    });
  } catch (error) {
    logger.error("Error al obtener los títulos financieros:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al obtener los títulos financieros.",
    });
  }
};

export default getFinancialTitles;