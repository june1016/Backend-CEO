import RawMaterialsInventory from '../../models/rawMaterialsInventory.js';
import logger from '../../../config/logger.js';

const getInitialRawMaterialsInventory = async (_req, reply) => {
  try {
    const inventoryResult = await RawMaterialsInventory.findAll({
      attributes: [
        'id',
        'code',
        'description',
        'quantity',
        'unit',
        'unit_cost',
        'created_at',
        'updated_at',
      ],
      where: { created_by: 1 },
      logging: false,
    });

    const rawMaterialsInventory = inventoryResult.map((item) => ({
      id: item.id,
      code: item.code,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unit_cost: item.unit_cost,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      rawMaterialsInventory,
    });
  } catch (error) {
    logger.error('Error obteniendo el inventario inicial de materias primas:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Se ha producido un error al intentar obtener el inventario inicial de materias primas.',
    });
  }
};

const getRawMaterialsInventoryByCreatedBy = async (req, reply) => {
  try {
    const { created_by } = req.query;

    if (!created_by) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: "El parámetro 'created_by' es obligatorio.",
      });
    }

    const inventoryResult = await RawMaterialsInventory.findAll({
      attributes: [
        'id',
        'code',
        'description',
        'quantity',
        'unit',
        'unit_cost',
        'created_at',
        'updated_at',
      ],
      where: { created_by },
      logging: false,
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      rawMaterialsInventory: inventoryResult,
    });
  } catch (error) {
    logger.error('Error obteniendo materias primas por usuario:', error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: 'Error al obtener el inventario de materias primas.',
    });
  }
};

const createRawMaterialsInventory = async (req, reply) => {
  try {
    const { rawMaterialsInventory } = req.body;

    if (!Array.isArray(rawMaterialsInventory) || rawMaterialsInventory.length === 0) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Se requiere un array con los datos del inventario de materias primas.',
      });
    }

    const invalid = rawMaterialsInventory.some(({ quantity, unit_cost }) =>
      quantity < 0 || unit_cost < 0
    );

    if (invalid) {
      return reply.code(400).send({
        ok: false,
        statusCode: 400,
        message: 'Las cantidades y costos unitarios deben ser mayores o iguales a cero.',
      });
    }

    const processed = [];

    for (const item of rawMaterialsInventory) {
      const { code, created_by, quantity, unit_cost, unit, description } = item;

      const existing = await RawMaterialsInventory.findOne({
        where: { code, created_by },
      });

      if (existing) {
        await existing.update({
          quantity: Number(quantity),
          unit_cost: Number(unit_cost),
          updated_by: created_by,
        });
        processed.push(existing);
      } else {
        const newItem = await RawMaterialsInventory.create({
          code,
          description,
          quantity: Number(quantity),
          unit,
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
        message: 'Inventario de materias primas guardado correctamente.',
        rawMaterialsInventory: processed,
      });
    } catch (error) {
      logger.error('Error al registrar materias primas:', error);
      return reply.code(500).send({
        ok: false,
        statusCode: 500,
        message: 'Error al registrar el inventario de materias primas.',
      });
    }
  };


  export {
    getInitialRawMaterialsInventory,
    createRawMaterialsInventory,
    getRawMaterialsInventoryByCreatedBy
  }