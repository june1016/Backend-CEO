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
      statusCode: 200,
      financialData,
    });
  } catch (error) {
    logger.error("Error obteniendo los datos financieros iniciales:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al intentar obtener los datos financieros iniciales.",
    });
  }
};

const createFinancialData = async (req, reply) => {
  try {
    const { financialData } = req.body;

    if (!Array.isArray(financialData) || financialData.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "Se requiere un array con los datos financieros a registrar."
      });
    }

    const newFinancialData = await FinancialData.bulkCreate(
      financialData.map(({ title_id, literal_id, amount, created_by }) => ({
        title_id,
        literal_id,
        amount,
        created_by,
        updated_by: created_by
      })),
      { logging: false } 
    );

    return reply.code(201).send({
      ok: true,
      statusCode: 201,
      message: "Datos financieros registrados exitosamente.",
      financialData: newFinancialData
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      logger.error("Error de clave única duplicada:", error);
      return reply.code(409).send({
        ok: false,
        statusCode: 409,
        message: "Ya existen tus datos financieros. "
      });
    }

    logger.error("Error registrando datos financieros:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al intentar registrar los datos financieros."
    });
  }
};

export {
  getInitialFinancialData,
  createFinancialData
};
