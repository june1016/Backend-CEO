import MonthlyOperation from '../../models/monthlyOperations.js';
import logger from '../../../config/logger.js';
import { convertRealDateToSimulated, getSimulatedDateFor } from '../../../shared/helper/simulationDateHelper.js';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import OperationProgress from '../../models/progressOperation.js';


/**
 * Permite al usuario marcar un crédito como pagado manualmente.
 */
export const markCreditAsPaid = async (req, reply) => {
  try {
    const { operation_id } = req.body;

    if (!operation_id) {
      return reply.code(400).send({ ok: false, message: 'operation_id requerido' });
    }

    const operation = await MonthlyOperation.findByPk(operation_id);

    if (!operation) {
      return reply.code(404).send({ ok: false, message: 'Operación no encontrada' });
    }

    if (operation.is_paid) {
      return reply.code(400).send({ ok: false, message: 'Esta venta ya está pagada' });
    }

    operation.is_paid = true;
    operation.paid_at = new Date();
    await operation.save();

    return reply.code(200).send({ ok: true, message: 'Crédito marcado como pagado correctamente' });
  } catch (error) {
    logger.error(`Error al marcar crédito como pagado: ${error.message}`);
    return reply.code(500).send({ ok: false, message: 'Error interno' });
  }
};

/**
 * Obtiene las ventas a crédito pendientes por cobrar.
 */
export const getPendingCredits = async (req, reply) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return reply.code(400).send({ ok: false, message: 'user_id requerido' });
    }

    // Traer el progreso para saber el start_time real
    const progress = await OperationProgress.findOne({
      where: { user_id },
      order: [["created_at", "DESC"]],
      logging: false
    });

    if (!progress || !progress.start_time) {
      return reply.code(404).send({ ok: false, message: 'Progreso de simulación no encontrado' });
    }

    // Fecha simulada actual, partiendo de la fecha inicial simulada
    const simulatedStartDate = '2025-01-01T00:00:00Z';

    const totalRealDuration = Date.now() - new Date(progress.start_time).getTime();
    const msPerSimulatedMonth = 7 * 24 * 60 * 60 * 1000;
    const monthsSimulated = Math.floor(totalRealDuration / msPerSimulatedMonth);

    const simulatedDate = new Date(simulatedStartDate);
    simulatedDate.setMonth(simulatedDate.getMonth() + monthsSimulated);

    // Traer créditos reales
    const pendingCredits = await MonthlyOperation.findAll({
      where: { user_id, is_paid: false },
      attributes: ['id', 'total_cost', 'created_at', 'credit_days'],
      order: [['created_at', 'ASC']],
    });

    // Calcular fechas simuladas
    const data = pendingCredits.map(credit => {
      const simulatedCreatedAt = convertRealDateToSimulated(
        credit.created_at,
        progress.start_time,
        simulatedStartDate
      );
      const paidDueDate = new Date(simulatedCreatedAt);
      paidDueDate.setDate(paidDueDate.getDate() + credit.credit_days);


      const daysRemaining = differenceInCalendarDays(paidDueDate, simulatedDate);

      return {
        ...credit.toJSON(),
        simulated_created_at: simulatedCreatedAt,
        paid_due_date: paidDueDate,
        days_remaining: daysRemaining,
      };
    });

    return reply.code(200).send({
      ok: true,
      simulatedDate,
      pendingCredits: data,
    });
  } catch (error) {
    logger.error(`Error al obtener créditos pendientes: ${error.stack}`);
    return reply.code(500).send({ ok: false, message: 'Error interno' });
  }
};
