import logger from "../../../config/logger.js";
import Machine from "../../models/machine.js";
import Products from "../../models/products.js";
import Specification from "../../models/specifications.js";

const getMachinesWithDetails = async (req, reply) => {
  try {
    const machines = await Machine.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Products,
          attributes: ['id', 'name'],
        },
        {
          model: Specification,
          attributes: [
            'id',
            'base_capacity',
            'setup_time',
            'production_time',
            'maintenance_time',
            'daily_standard_output',
            'max_monthly_capacity',
          ],
        },
      ],
      logging: false,
      order: [['id', 'ASC']],
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Máquinas obtenidas correctamente.",
      machines,
    });

  } catch (error) {
    logger.error("Error obteniendo máquinas con detalles:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se produjo un error al obtener las máquinas.",
    });
  }
};

export {
  getMachinesWithDetails,
};
