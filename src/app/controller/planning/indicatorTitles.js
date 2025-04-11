import logger from "../../../config/logger.js";
import AnnualObjectiveIndicators from "../../models/annualObjectiveIndicators.js";
import IndicatorTitles from "../../models/IndicatorTitles.js";

const getIndicatorTitles = async (req, reply) => {
  try {
    const indicatorTitles = await IndicatorTitles.findAll({
        include: [
          {
            model: AnnualObjectiveIndicators,
            attributes: ["literal_id", "unit_id"]
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
      indicatorTitles: indicatorTitles,
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

export default getIndicatorTitles;