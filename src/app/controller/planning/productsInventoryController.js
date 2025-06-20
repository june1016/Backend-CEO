import Products from '../../models/products.js';
import logger from '../../../config/logger.js';
import ProductInventory from '../../models/productInventory.js';

const getProductInventoryByUser = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const inventories = await ProductInventory.findAll({
      where: { created_by },
      include: [
        {
          model: Products,
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'product_id', 'quantity', 'unit_cost', 'created_at', 'updated_at'],
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      inventories,
    });
  } catch (error) {
    logger.error('Error al obtener inventario de productos:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener inventario de productos.',
    });
  }
};

const createProductInventory = async (req, reply) => {
  try {
    const { inventories } = req.body;

    if (!Array.isArray(inventories) || inventories.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los datos del inventario.',
      });
    }

    const invalidValues = inventories.some(({ quantity }) => quantity < 0);
    if (invalidValues) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Las cantidades no pueden ser negativas.',
      });
    }

    const processed = [];

    for (const item of inventories) {
      const { product_id, unit_cost, created_by, quantity } = item;

      const existing = await ProductInventory.findOne({
        where: { product_id, created_by },
        logging: false,
      });

      if (existing) {
        await existing.update({
          quantity: Number(quantity),
          unit_cost: Number(unit_cost),
          updated_by: created_by,
        });
        processed.push(existing);
      } else {
        const newItem = await ProductInventory.create({
          product_id,
          quantity: Number(quantity),
          unit_cost: Number(unit_cost),
          created_by,
          updated_by: created_by,
        });
        processed.push(newItem);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: 'Inventario actualizado correctamente.',
      inventories: processed,
    });
  } catch (error) {
    logger.error('Error al crear/actualizar inventario de productos:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al registrar inventario de productos.',
    });
  }
};

const getInitialProductInventory = async (_req, reply) => {
  try {
    const inventories = await ProductInventory.findAll({
      where: { created_by: 1 },
      include: [{ model: Products, attributes: ['id', 'name'] }],
      attributes: ['id', 'product_id', 'quantity', 'created_at', 'updated_at'],
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      inventories,
    });
  } catch (error) {
    logger.error('Error obteniendo inventario inicial:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener inventario inicial.',
    });
  }
};

export {
  getProductInventoryByUser,
  createProductInventory,
  getInitialProductInventory,
};
