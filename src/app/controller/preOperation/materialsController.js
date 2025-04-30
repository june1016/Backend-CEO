import Material from "../../models/materials.js";
import Unit from "../../models/units.js";
import { logger } from "../../../config/index.js";

const getMaterialsController = async (req, reply) => {
  try {
    const materials = await Material.findAll({
      include: {
        model: Unit,
        attributes: ["name"],
      },
      logging: false,
    });

    const formattedMaterials = materials.map((material) => ({
      id: material.id,
      code: material.code,
      name: material.name,
      description: material.description,
      unit: material.Unit?.name || null,
      basePrice: parseFloat(material.base_price),
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Materiales obtenidos correctamente.",
      materials: formattedMaterials,
    });
  } catch (error) {
    logger.error("Error obteniendo materiales:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se produjo un error al obtener los materiales.",
    });
  }
};

export { getMaterialsController };