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

export {
    getInitialRawMaterialsInventory
}