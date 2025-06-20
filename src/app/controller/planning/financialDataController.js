import logger from "../../../config/logger.js";
import FinancialData from "../../models/financialData.js";
import FinancialTitle from "../../models/financialTitleData.js";
import FinancialCategory from "../../models/financialCategoryData.js";

const getInitialFinancialData = async (_req, reply) => {
  try {
    const financialDataResult = await FinancialData.findAll({
      attributes: ["id", "amount", "created_at", "updated_at"],
      where: { created_by: 1 },
      include: [
        {
          model: FinancialTitle,
          attributes: ["id", "name", "icon"],
          include: {
            model: FinancialCategory,
            attributes: ["id", "name"],
          },
        },
      ],
      logging: false,
    });

    const financialData = financialDataResult.map((data) => ({
      id: data.id,
      title: data.FinancialTitle?.name,
      category: data.FinancialTitle?.FinancialCategory?.name,
      amount: data.amount,
      icon: data.FinancialTitle?.icon,
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
      message:
        "Se ha producido un error al intentar obtener los datos financieros iniciales.",
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
        message: "Se requiere un array con los datos financieros a registrar.",
      });
    }

    const invalidAmounts = financialData.some(({ amount }) => amount <= 0);

    if (invalidAmounts) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message:
          "El valor de los campos no puede contener valores menores o iguales a 0.",
      });
    }

    const processedData = [];

    for (const data of financialData) {
      const { title_id, created_by, literal_id, amount } = data;

      const existingRecord = await FinancialData.findOne({
        where: { title_id, created_by },
        logging: false,
      });

      if (existingRecord) {
        await existingRecord.update({
          amount,
          literal_id,
          updated_by: created_by,
        });
        processedData.push(existingRecord);
      } else {
        const newData = await FinancialData.create({
          title_id,
          literal_id,
          amount,
          created_by,
          updated_by: created_by,
        });
        processedData.push(newData);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Datos financieros registrados exitosamente.",
      financialData: processedData,
    });
  } catch (error) {
    logger.error("Error registrando datos financieros:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message:
        "Se ha producido un error al intentar registrar los datos financieros.",
    });
  }
};

const getFinancialDataByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const financialDataResult = await FinancialData.findAll({
      where: { created_by },
      attributes: ["id", "amount", "created_at", "updated_at"],
      include: [
        {
          model: FinancialTitle,
          attributes: ["id", "name", "icon"],
          include: {
            model: FinancialCategory,
            attributes: ["id", "name"],
          },
        },
      ],
      logging: false,
    });

    const financialData = financialDataResult.map((data) => ({
      id: data.id,
      title: data.FinancialTitle?.name,
      category: data.FinancialTitle?.FinancialCategory?.name,
      amount: data.amount,
      icon: data.FinancialTitle?.icon,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      financialData,
    });
  } catch (error) {
    logger.error("Error buscando datos financieros por created_by:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al buscar datos financieros por created_by.",
    });
  }
};

export {
  getInitialFinancialData,
  createFinancialData,
  getFinancialDataByCreatedBy,
};
