import AnnualObjectiveIndicators from "../../models/annualObjectiveIndicators.js";
import IndicatorTitles from "../../models/IndicatorTitles.js";
import Literals from "../../models/literals.js";
import Units from "../../models/Units.js";

const getInitialAnnualObjectiveIndicators = async (_req, reply) => {
    try {
        const indicatorsResult = await AnnualObjectiveIndicators.findAll({
            attributes: ["id", "value", "created_at", "updated_at"],
            where: { created_by: 1 },
            include: [
                {
                    model: IndicatorTitles,
                    attributes: ["id", "name"],
                },
                {
                    model: Literals,
                    attributes: ["id", "name"],
                },
                {
                    model: Units,
                    attributes: ["id", "name"],
                }
            ],
            order: [["id", "ASC"]],
            logging: false
        });

        const indicators = indicatorsResult.map((indicator) => ({
            id: indicator.id,
            title: indicator.IndicatorTitle?.name,
            literal: indicator.Literal?.name,
            unit: indicator.Unit?.name,
            value: indicator.value,
            created_at: indicator.created_at,
            updated_at: indicator.updated_at,
        }));

        reply.send(indicators);
    } catch (error) {
        console.error("Error fetching initial annual objective indicators:", error);
        reply.status(500).send({ message: "Error fetching data" });
    }
};

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
  
      const newIndicators = await AnnualObjectiveIndicators.bulkCreate(
        indicators.map(({ title_id, literal_id, unit_id, value, created_by }) => ({
          title_id,
          literal_id,
          unit_id,
          value,
          created_by,
          updated_by: created_by
        })),
        { logging: false }
      );
  
      return reply.code(201).send({
        ok: true,
        statusCode: 201,
        message: "Indicadores anuales registrados exitosamente.",
        indicators: newIndicators
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        console.error("Error de clave única duplicada:", error);
        return reply.code(409).send({
          ok: false,
          statusCode: 409,
          message: "Algunos de los indicadores anuales ya existen."
        });
      }
  
      console.error("Error registrando indicadores anuales:", error);
      return reply.code(500).send({
        ok: false,
        statusCode: 500,
        message: "Se ha producido un error al intentar registrar los indicadores anuales."
      });
    }
  };

export {
    getInitialAnnualObjectiveIndicators,
    createAnnualObjectiveIndicators
}