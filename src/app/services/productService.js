
import ProductInventory from "../models/productInventory.js";
import Products from "../models/products.js";

export const getProducts = async (userId) => {
  const inventories = await ProductInventory.findAll({
    where: { created_by: userId },
    include: [{ model: Products, attributes: ['name'] }],
    logging: false,
  });

  return inventories.map(item => ({
    product_id: item.product_id,
    name: item.Product?.name || `Producto #${item.product_id}`,
    unit_cost: item.unit_cost,
    base_probability: item.base_probability,
    investment_percent: item.investment_percent,
    credit30: item.credit30,
    credit60: item.credit60,
  }));
};