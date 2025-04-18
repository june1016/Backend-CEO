import logger from "../../../config/logger.js";
import AnnualObjectiveIndicators from "../../models/annualObjectiveIndicators.js";

const createAnnualObjectiveIndicators = async (req, reply) => {
  try {
    const { indicators } = req.body;

    if (!Array.isArray(indicators) || indicators.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere un array con los indicadores anuales a registrar."
      });
    }

    const invalidValues = indicators.some(({ value }) => value <= 0);
    if (invalidValues) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El valor de los campos no puede contener valores menores o iguales a 0."
      });
    }

    const processedIndicators = [];

    for (const indicator of indicators) {
      const { title_id, created_by } = indicator;

      const existing = await AnnualObjectiveIndicators.findOne({
        where: { title_id, created_by },
        logging: false
      });

      if (existing) {
        // Actualizar
        await existing.update(
          {
            ...indicator,
            updated_by: created_by
          },
          { logging: false }
        );
        processedIndicators.push(existing);
      } else {
        // Crear
        const created = await AnnualObjectiveIndicators.create(
          {
            ...indicator,
            updated_by: created_by
          },
          { logging: false }
        );
        processedIndicators.push(created);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Los Indicadores anuales han sido registrados exitosamente.",
      indicators: processedIndicators
    });
  } catch (error) {
    logger.error("Error registrando indicadores anuales:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al intentar registrar los indicadores anuales."
    });
  }
};

export default createAnnualObjectiveIndicators;