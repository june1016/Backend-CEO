import MonthlyOperation from '../../models/monthlyOperations.js';
import logger from '../../../config/logger.js';
import { getSimulatedDate } from '../../../shared/helper/simulationDateHelper.js';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

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

    const simulatedDate = await getSimulatedDate(user_id);
    if (!simulatedDate) {
      return reply.code(404).send({ ok: false, message: 'Progreso de simulación no encontrado' });
    }

    const pendingCredits = await MonthlyOperation.findAll({
      where: {
        user_id,
        is_paid: false
      },
      attributes: ['id', 'total_cost', 'created_at', 'credit_days'],
      order: [['created_at', 'ASC']],
    });

    const data = pendingCredits.map(credit => {
      const paidDueDate = new Date(credit.created_at);
      paidDueDate.setDate(paidDueDate.getDate() + credit.credit_days);
      const daysRemaining = differenceInCalendarDays(paidDueDate, simulatedDate);

      return {
        ...credit.toJSON(),
        paid_due_date: paidDueDate,
        days_remaining: daysRemaining,
      };
    });

    return reply.code(200).send({
      ok: true,
      pendingCredits: data,
      simulatedDate,
    });
  } catch (error) {
    logger.error(`Error al obtener créditos pendientes: ${error.stack}`);
    return reply.code(500).send({ ok: false, message: 'Error interno' });
  }
};
