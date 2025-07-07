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
      attributes: [
        'id',
        'product_id',
        'quantity',
        'unit_cost',
        'credit30',
        'credit60',
        'investment_percent',
        'created_at',
        'updated_at',
      ],
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
        message: "Se requiere un array con los datos del inventario.",
      });
    }

    const processed = [];

    for (const item of inventories) {
      const {
        product_id,
        created_by,
        quantity,
        unit_cost,
        credit30,
        credit60,
        investment_percent,
      } = item;

      if (!product_id || !created_by) {
        continue; // Ignora los que no tienen IDs clave
      }

      const existing = await ProductInventory.findOne({
        where: { product_id, created_by },
        logging: false,
      });

      const fieldsToApply = {};

      if (quantity !== undefined) fieldsToApply.quantity = Number(quantity);
      if (unit_cost !== undefined) fieldsToApply.unit_cost = Number(unit_cost);
      if (credit30 !== undefined) fieldsToApply.credit30 = Number(credit30);
      if (credit60 !== undefined) fieldsToApply.credit60 = Number(credit60);
      if (investment_percent !== undefined)
        fieldsToApply.investment_percent = Number(investment_percent);

      fieldsToApply.updated_by = created_by;

      if (existing) {
        await existing.update(fieldsToApply);
        processed.push(existing);
      } else {
        // Para creación, se permite que falten valores, y se guardan como null
        const newItem = await ProductInventory.create({
          product_id,
          created_by,
          updated_by: created_by,
          quantity: quantity !== undefined ? Number(quantity) : null,
          unit_cost: unit_cost !== undefined ? Number(unit_cost) : null,
          credit30: credit30 !== undefined ? Number(credit30) : null,
          credit60: credit60 !== undefined ? Number(credit60) : null,
          investment_percent: investment_percent !== undefined ? Number(investment_percent) : null,
        });
        processed.push(newItem);
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Inventario actualizado correctamente.",
      inventories: processed,
    });
  } catch (error) {
    logger.error("Error al crear/actualizar inventario de productos:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Error al registrar inventario de productos.",
    });
  }
};


const getInitialProductInventory = async (_req, reply) => {
  try {
    const inventories = await ProductInventory.findAll({
      where: { created_by: 1 },
      include: [{ model: Products, attributes: ['id', 'name'] }],
      attributes: [
        'id',
        'product_id',
        'quantity',
        'unit_cost',
        'credit30',
        'credit60',
        'investment_percent',
        'created_at',
        'updated_at',
      ],
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
