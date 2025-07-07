import logger from "../../../config/logger.js";
import MarketingConfiguration from "../../models/MarketingConfiguration.js";


/**
 * Configuración inicial por defecto para el usuario 1
 */
const getInitialMarketingConfiguration = async (_req, reply) => {
  try {
    const config = await MarketingConfiguration.findOne({
      where: { user_id: 1 },
      logging: false,
    });

    if (!config) {
      return reply.code(404).send({
        ok: false,
        statusCode: 404,
        message: 'No se encontró configuración inicial de marketing.',
      });
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      configuration: config,
    });
  } catch (error) {
    logger.error('Error obteniendo configuración inicial:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener configuración inicial.',
    });
  }
};

/**
 * Obtener configuración de marketing por usuario
 */
const getMarketingConfigurationByUser = async (req, reply) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'user_id' es obligatorio.",
      });
    }

    const config = await MarketingConfiguration.findOne({
      where: { user_id: user_id },
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      configuration: config,
    });
  } catch (error) {
    logger.error("Error al obtener configuración de marketing por usuario:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al obtener configuración del usuario.",
    });
  }
};

/**
 * Crear o actualizar configuración de marketing por usuario
 */
const upsertMarketingConfiguration = async (req, reply) => {
  try {
    const { user_id, percent, cost } = req.body;

    if (!user_id || percent === undefined || cost === undefined) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Faltan datos obligatorios (user_id, percent, cost).',
      });
    }

    const existingConfig = await MarketingConfiguration.findOne({
      where: { user_id },
    });

    let config;
    let created;

    if (existingConfig) {
      await existingConfig.update({
        percent,
        cost,
        updated_at: new Date(),
      });
      config = existingConfig;
      created = false;
    } else {
      config = await MarketingConfiguration.create({
        user_id,
        percent,
        cost,
        created_at: new Date(),
        updated_at: new Date(),
      });
      created = true;
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: created ? 'Configuración creada correctamente.' : 'Configuración actualizada correctamente.',
      configuration: config,
    });

  } catch (error) {
    logger.error('Error al guardar configuración de marketing:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al guardar configuración de marketing.',
    });
  }
};


export {
  getInitialMarketingConfiguration,
  getMarketingConfigurationByUser,
  upsertMarketingConfiguration,
};
