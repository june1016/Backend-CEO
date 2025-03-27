import logger from "../../../config/logger.js";
import SalesBudget from "../../models/salesBudget.js";

const createSalesBudget = async (req, reply) => {
  try {
      const { salesBudget } = req.body;

      if (!Array.isArray(salesBudget) || salesBudget.length === 0) {
          return reply.code(400).send({
              ok: false,
              statusCode: 400,
              message: "Se requiere un array con los datos del presupuesto de ventas a registrar."
          });
      }

      const validatedSalesBudget = salesBudget.map(({ month_id, growth, decade_1, decade_2, decade_3, created_by }) => {
          let total = decade_1 + decade_2 + decade_3;

          console.log(total);

          if (total >= 99.5 && total < 100) {
            decade_3 += Math.round(100 - total);
          } else if (total !== 100) {
            return reply.code(409).send({
              ok: false,
              statusCode: 409,
              message: `La suma de las tres décadas en el mes ${month_id} decadas: 1=${decade_1} 2=${decade_2} 3=${decade_3} debe ser exactamente 100.`
          });
          }

          return {
              month_id,
              growth,
              decade_1,
              decade_2,
              decade_3,
              created_by,
              updated_by: created_by
          };
      });

      const newSalesBudget = await SalesBudget.bulkCreate(validatedSalesBudget, { logging: false });

      return reply.code(201).send({
          ok: true,
          statusCode: 201,
          message: "Presupuesto de ventas registrado exitosamente.",
          salesBudget: newSalesBudget
      });
  } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
          logger.error("Error de clave única duplicada:", error);
          return reply.code(409).send({
              ok: false,
              statusCode: 409,
              message: "Ya existe un presupuesto de ventas registrado para el mes especificado."
          });
      }

      logger.error("Error registrando presupuesto de ventas:", error);
      return reply.code(500).send({
          ok: false,
          statusCode: 500,
          message: "Se ha producido un error al intentar registrar el presupuesto de ventas."
      });
  }
};

const getSalesBudgetDetailsByMonth = async (req, reply) => {
  try {
      const { month_id } = req.params;

      const salesBudget = await SalesBudget.findOne({
          where: { month_id },
          attributes: ["growth", "decade_1", "decade_2", "decade_3"],
          logging: false
      });

      if (!salesBudget) {
          return reply.code(404).send({
              ok: false,
              statusCode: 404,
              message: "No se encontraron datos de presupuesto de ventas para el mes especificado."
          });
      }

      return reply.code(200).send({
          ok: true,
          statusCode: 200,
          message: "Datos de presupuesto de ventas obtenidos correctamente.",
          salesBudget
      });
  } catch (error) {
      logger.error("Error al consultar los datos de presupuesto de ventas:", error);
      return reply.code(500).send({
          ok: false,
          statusCode: 500,
          message: "Error al intentar consultar los datos de presupuesto de ventas."
      });
  }
};

export {
 createSalesBudget,
 getSalesBudgetDetailsByMonth
}