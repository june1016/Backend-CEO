import Provider from "../../models/provider.js";
import ProviderPaymentOption from "../../models/providerPaymentOptions.js";
import Material from "../../models/materials.js";
import MaterialByProvider from "../../models/materialsByProvider.js";
import { logger } from "../../../config/index.js";
import Units from "../../models/units.js";

const getProviderWithMaterials = async (req, reply) => {
  try {
    const userId = req.params.user_id;


    const providers = await Provider.findAll({
      include: [
        {
          model: ProviderPaymentOption,
          attributes: ["option"],
        },
        {
          model: MaterialByProvider,
          attributes: ["price"],
          where: { created_by: userId },
          include: {
            model: Material,
            attributes: ["id", "code", "name", "base_price", "unit_id"],
            include: {
              model: Units,
              attributes: ["id", "name"],
            }
          },
        },
      ],
      logging: false,
    });

    const formattedSuppliers = providers.map((provider) => ({
      id: provider.id,
      name: provider.name,
      logo: provider.logo,
      description: provider.description,
      location: provider.location,
      deliveryTime: provider.delivery_time,
      volumeDiscount: provider.volume_discount,
      paymentOptions: provider.provider_payment_options.map((p) => p.option),
      materials: provider.materials_by_providers.map((mp) => ({
        id: mp.material?.id,
        code: mp.material?.code,
        name: mp.material?.name,
        unit: mp.material?.Unit?.name,
        basePrice: parseFloat(mp.material?.base_price),
        price: parseFloat(mp.price),
      })),
    }));

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Proveedores obtenidos correctamente.",
      suppliers: formattedSuppliers,
    });
  } catch (error) {
    logger.error("Error obteniendo proveedores con materiales:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se produjo un error al obtener los proveedores.",
    });
  }
};

const saveMaterialsByProvider = async (req, reply) => {
  try {
    const userId = req.params.user_id;

    const materialsData = req.body;

    const materialsToSave = materialsData.map(item => ({
      provider_id: item.supplierId,
      material_id: item.materialId,
      payment_option: item.paymentOption,
      price: item.price,
      created_by: userId,
      updated_by: userId,
    }));

    // Usar findOrCreate en lugar de upsert
    for (const material of materialsToSave) {
      const [existingMaterial, created] = await MaterialByProvider.findOrCreate({
        where: {
          material_id: material.material_id,
          updated_by: material.updated_by,
        },
        defaults: material, // Si no existe, se crea el nuevo
      });

      // Si el material ya existe, lo actualizamos
      if (!created) {
        await existingMaterial.update({
          provider_id: material.provider_id,
          price: material.price,
          payment_option: material.payment_option,
        });
      }
    }

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Materiales por proveedor guardados correctamente.",
    });
  } catch (error) {
    logger.error("Error al guardar materiales por proveedor:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se produjo un error al guardar los materiales por proveedor.",
    });
  }
};

export { getProviderWithMaterials, saveMaterialsByProvider };
