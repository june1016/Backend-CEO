import OperationProgress from "../../models/progressOperation.js";
import logger from "../../../config/logger.js";

const startOperationProgress = async (req, reply) => {
  try {
    const { user_id } = req.body;

    if (!Number.isInteger(user_id)) {
      return reply.code(400).send({
        ok: false,
        message: "user_id debe ser un entero.",
      });
    }

    const now = new Date();

    const [progress, created] = await OperationProgress.upsert({
      user_id,
      month_id: 1,
      current_decade: 1,
      is_december: false,
      start_time: now,
      updated_at: now,
    }, { returning: true });

    return reply.code(created ? 201 : 200).send({
      ok: true,
      message: created ? "Simulación iniciada." : "Simulación reiniciada.",
      progress,
    });
  } catch (error) {
    logger.error("Error en startOperationProgress:", error);
    return reply.code(500).send({
      ok: false,
      message: "Error interno al iniciar la simulación.",
    });
  }
};

// Obtener tiempo simulado actual basado en la hora de inicio
const getSimulatedTime = async (req, reply) => {
  try {
    const user_id = parseInt(req.params.user_id, 10);

    if (isNaN(user_id)) {
      return reply.code(400).send({
        ok: false,
        message: "user_id inválido.",
      });
    }

    const progress = await OperationProgress.findOne({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });

    if (!progress || !progress.start_time) {
      return reply.code(200).send({
        ok: false,
        message: "La simulación aún no ha comenzado."
      });
    }

    const now = new Date();
    const elapsedMs = now.getTime() - new Date(progress.start_time).getTime();
    const elapsedMinutes = elapsedMs / 60000;

    const totalRealMinutes = 120;
    const totalSimulatedMonths = 12;

    const simulatedMonths = (elapsedMinutes / totalRealMinutes) * totalSimulatedMonths;
    const clampedSimulatedMonths = Math.min(simulatedMonths, totalSimulatedMonths);

    const currentMonth = Math.max(1, Math.min(Math.floor(clampedSimulatedMonths) + 1, 12));
    const fractionalMonth = clampedSimulatedMonths % 1;

    let currentDecade;

    if (currentMonth === 12 && clampedSimulatedMonths >= 12) {
      currentDecade = 3;
    } else if (fractionalMonth < 1 / 3) {
      currentDecade = 1;
    } else if (fractionalMonth < 2 / 3) {
      currentDecade = 2;
    } else {
      currentDecade = 3;
    }

    const isDecember = currentMonth === 12;

    return reply.code(200).send({
      ok: true,
      message: "Tiempo simulado obtenido correctamente.",
      data: {
        currentMonth,
        currentDecade,
        isDecember,
        elapsedMinutes,
        startedAt: progress.start_time,
      },
    });
  } catch (error) {
    return reply.code(500).send({
      ok: false,
      message: "Error interno al calcular el tiempo simulado.",
    });
  }
};
// Obtener progreso del usuario (sin recalcular tiempo)
const getOperationProgressByUser = async (req, reply) => {
  try {
    const user_id = parseInt(req.params.user_id, 10);

    if (isNaN(user_id)) {
      return reply.code(400).send({
        ok: false,
        message: "user_id inválido.",
      });
    }

    const progress = await OperationProgress.findAll({
      where: { user_id },
    });

    return reply.code(200).send({
      ok: true,
      message: "Progreso obtenido correctamente.",
      progress,
    });
  } catch (error) {
    logger.error("Error en getOperationProgressByUser:", error);
    return reply.code(500).send({
      ok: false,
      message: "Error interno al obtener el progreso.",
    });
  }
};

// Función opcional para forzar un update manual del estado (si quisieras mantenerla)
const upsertOperationProgress = async (req, reply) => {
  try {
    const { user_id, month_id, current_decade, is_december } = req.body;

    // Validación de campos obligatorios
    if (!user_id || !current_decade) {
      return reply.code(400).send({
        ok: false,
        message: "Faltan campos obligatorios.",
      });
    }

    // Usar upsert para insertar o actualizar el progreso
    await OperationProgress.upsert({
      user_id,
      month_id,  // Este campo es opcional si ya decides no usarlo.
      current_decade,
      is_december,
      start_time: new Date(),  // Usar el valor por defecto si no es necesario.
      updated_at: new Date(),  // Actualizar la fecha de modificación.
    });

    return reply.code(200).send({
      ok: true,
      message: "Progreso actualizado correctamente.",
    });
  } catch (error) {
    logger.error("Error en upsertOperationProgress:", error);
    return reply.code(500).send({
      ok: false,
      message: "Error interno al guardar el progreso.",
    });
  }
};

export {
  startOperationProgress,
  getSimulatedTime,
  getOperationProgressByUser,
  upsertOperationProgress
};
