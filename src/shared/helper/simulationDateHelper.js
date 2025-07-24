import OperationProgress from "../../app/models/progressOperation.js";

/**
 * Calcula la fecha simulada actual para un usuario.
 * @param {string|number} user_id
 * @returns {Promise<Date|null>}
 */
export const getSimulatedDate = async (user_id) => {
  const progress = await OperationProgress.findOne({ where: { user_id } });
  if (!progress) return null;

  const now = new Date();
  const elapsedMs = now.getTime() - new Date(progress.start_time).getTime();

  const msPerSimulatedMonth = 7 * 24 * 60 * 60 * 1000; // 1 semana real = 1 mes simulado
  const monthsSimulated = Math.floor(elapsedMs / msPerSimulatedMonth);

  const simulatedDate = new Date(progress.start_time);
  simulatedDate.setMonth(simulatedDate.getMonth() + monthsSimulated);

  return simulatedDate;
};
