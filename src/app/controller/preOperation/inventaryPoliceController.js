import logger from "../../../config/logger.js";
import InventoryPolicy from "../../models/inventoryPolice.js";

const createOrUpdateInventoryPolicy = async (req, reply) => {
  try {
    const { created_by, policies } = req.body;

    if (!created_by || typeof created_by !== 'number') {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El campo 'created_by' es requerido y debe ser un número.",
      });
    }

    if (!policies || typeof policies !== 'object' || Array.isArray(policies)) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El campo 'policies' debe ser un objeto con formato { month_id: value }.",
      });
    }

    const results = [];

    for (const [monthIdStr, value] of Object.entries(policies)) {
      const month_id = parseInt(monthIdStr, 10);

      if (isNaN(month_id) || typeof value !== 'number' || value < 0 || value > 30) {
        return reply.code(400).send({
          ok: false,
          statusCode: 400,
          message: `Datos inválidos para el mes ${monthIdStr}. El valor debe estar entre 0 y 30.`,
        });
      }

      const existing = await InventoryPolicy.findOne({
        where: { month_id, created_by },
        logging: false,
      });

      if (existing) {
        await existing.update({
          value,
          updated_by: created_by,
          updated_at: new Date(),
        }, { logging: false });

        results.push(existing);
      } else {
        const newPolicy = await InventoryPolicy.create({
          month_id,
          value,
          created_by,
          updated_by: created_by,
          created_at: new Date(),
          updated_at: new Date(),
        }, { logging: false });

        results.push(newPolicy);
      }
    }

    return reply.code(201).send({
      ok: true,
      statusCode: 201,
      message: "Políticas de inventario procesadas exitosamente.",
      inventoryPolicy: results,
    });

  } catch (error) {
    logger.error("Error registrando políticas de inventario:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se ha producido un error al intentar registrar las políticas de inventario.",
    });
  }
};

export default createOrUpdateInventoryPolicy;
