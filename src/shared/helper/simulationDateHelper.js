import OperationProgress from "../../app/models/progressOperation.js";

/**
 * Calcula la fecha simulada actual para un usuario.
 * @param {string|number} user_id
 * @returns {Promise<Date|null>}
 */
export const getSimulatedDateFor = async (user_id, realDate) => {
  const progress = await OperationProgress.findOne({ where: { user_id } });
  if (!progress) return null;

  const startTime = new Date(progress.start_time);
  const startSimulatedDate = new Date('2025-01-01T00:00:00Z');

  const elapsedMs = realDate.getTime() - startTime.getTime();

  const msPerSimulatedMonth = 7 * 24 * 60 * 60 * 1000;
  const daysPerMonth = 30;
  const msPerSimulatedDay = msPerSimulatedMonth / daysPerMonth;

  const monthsSimulated = Math.floor(elapsedMs / msPerSimulatedMonth);
  const remainingMsInMonth = elapsedMs % msPerSimulatedMonth;
  const daysSimulatedInMonth = Math.floor(remainingMsInMonth / msPerSimulatedDay);

  const simulatedDate = new Date(startSimulatedDate);
  simulatedDate.setMonth(simulatedDate.getMonth() + monthsSimulated);
  simulatedDate.setDate(simulatedDate.getDate() + daysSimulatedInMonth);

  return simulatedDate;
};

// Función auxiliar para convertir created_at real a fecha simulada
export const convertRealDateToSimulated = (realDate, progressStartTime, simulatedStartDate) => {
  const realElapsed = new Date(realDate).getTime() - new Date(progressStartTime).getTime();
  const totalRealDuration = Date.now() - new Date(progressStartTime).getTime();

  // Calcular cuántos meses simulados han pasado desde el inicio
  const msPerSimulatedMonth = 7 * 24 * 60 * 60 * 1000; // 1 semana real = 1 mes simulado
  const simulatedNow = new Date(simulatedStartDate);
  simulatedNow.setMonth(simulatedNow.getMonth() + Math.floor(totalRealDuration / msPerSimulatedMonth));

  // Cuánto representa el realElapsed sobre totalRealDuration
  const fraction = realElapsed / totalRealDuration;
  const simulatedElapsedMs = fraction * (simulatedNow.getTime() - new Date(simulatedStartDate).getTime());

  return new Date(new Date(simulatedStartDate).getTime() + simulatedElapsedMs);
};

