import logger from "../../../config/logger.js";
import ProductInventory from "../../models/productInventory.js";
import Products from "../../models/products.js";

const getInitialProductInventory = async (_req, reply) => {
    try {
      const inventoryResult = await ProductInventory.findAll({
        attributes: ["id", "quantity", "unit_cost", "created_at", "updated_at"],
        where: { created_by: 1 },
        include: [
          {
            model: Products,
            attributes: ["id", "name"],
          },
        ],
        logging: false,
      });
  
      const inventory = inventoryResult.map((item) => ({
        id: item.id,
        product: item.Product?.name,
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
  
      return reply.code(200).send({
        ok: true,
        statusCode: 200,
        inventory,
      });
    } catch (error) {
      logger.error("Error obteniendo el inventario de productos:", error);
      return reply.code(500).send({
        ok: false,
        statusCode: 500,
        message: "Se ha producido un error al intentar obtener el inventario de productos.",
      });
    }
  };

export {
    getInitialProductInventory
}
  