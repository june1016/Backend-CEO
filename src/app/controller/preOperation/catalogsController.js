import logger from "../../../config/logger.js";
import Catalog from "../../models/catalog.js";
import Provider from "../../models/provider.js";
import Units from "../../models/Units.js";

const getCatalogsByProvider = async (req, reply) => {
  try {
    const { provider_id } = req.params;

    console.log(provider_id);

    if (!provider_id || isNaN(Number(provider_id))) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'provider_id' es requerido y debe ser un número.",
      });
    }

    const catalogs = await Catalog.findAll({
      where: { provider_id },
      include: [
        {
          model: Provider,
          attributes: ['id', 'name'],
        },
        {
          model: Units,
          attributes: ['id', 'name'],
        },
      ],
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Catálogos obtenidos correctamente.",
      catalogs,
    });

  } catch (error) {
    logger.error("Error obteniendo catálogos por proveedor:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se produjo un error al obtener los catálogos del proveedor.",
    });
  }
};

export {
    getCatalogsByProvider
};
