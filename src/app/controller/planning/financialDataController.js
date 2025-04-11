import logger from "../../../config/logger.js";
import FinancialData from "../../models/FinancialData.js";
import FinancialTitle from "../../models/FinancialTitle.js";
import FinancialCategory from "../../models/FinancialCategory.js";

const getInitialFinancialData = async (_req, reply) => {
  try {
    const financialDataResult = await FinancialData.findAll({
      attributes: ["id", "amount", "icon", "created_at", "updated_at"],
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
      icon: data.icon,
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
        // Actualizamos si ya existe
        await existingRecord.update({
          amount,
          literal_id,
          updated_by: created_by,
        });

        processedData.push(existingRecord);
      } else {
        // Creamos si no existe
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

export {
  getInitialFinancialData,
  createFinancialData
};
