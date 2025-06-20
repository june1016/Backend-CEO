import Products from '../../models/products.js';
import logger from '../../../config/logger.js';

const getInitialProducts = async (_req, reply) => {
  try {
    const products = await Products.findAll({
      where: { created_by: 1 },
      attributes: ['id', 'name', 'quantity', 'unit_cost', 'created_at', 'updated_at'],
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      products,
    });
  } catch (error) {
    logger.error('Error obteniendo los productos iniciales:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener los productos iniciales.',
    });
  }
};

const getProductsByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const products = await Products.findAll({
      where: { created_by },
      attributes: ['id', 'name', 'quantity', 'unit_cost', 'created_at', 'updated_at'],
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      products,
    });
  } catch (error) {
    logger.error('Error obteniendo productos por created_by:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener los productos.',
    });
  }
};

const createProducts = async (req, reply) => {
  try {
    const { productsData } = req.body;

    if (!Array.isArray(productsData) || productsData.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los datos de productos.',
      });
    }

    const invalidEntries = productsData.some(({ quantity, unit_cost }) => quantity <= 0 || unit_cost <= 0);
    if (invalidEntries) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Cantidad y costo unitario deben ser mayores a 0.',
      });
    }

    const processedProducts = [];

    for (const data of productsData) {
      const { name, quantity, unit_cost, created_by } = data;

      const existing = await Products.findOne({
        where: { name, created_by },
        logging: false,
      });

      if (existing) {
        await existing.update({
          quantity,
          unit_cost,
          updated_by: created_by,
        });
        processedProducts.push(existing);
      } else {
        const newProduct = await Products.create({
          name,
          quantity,
          unit_cost,
          created_by,
          updated_by: created_by,
        });
        processedProducts.push(newProduct);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Productos registrados exitosamente.',
      products: processedProducts,
    });
  } catch (error) {
    logger.error('Error registrando productos:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al registrar productos.',
    });
  }
};

export {
  getInitialProducts,
  getProductsByCreatedBy,
  createProducts
};
