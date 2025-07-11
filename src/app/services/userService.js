
import { Op } from 'sequelize';
import MonthlyOperation from '../models/monthlyOperations.js';
import OperationProgress from '../models/progressOperation.js';
import PersonnelExpense from '../models/personnelExpenses.js';
import Users from '../models/users.js';
import PayrollImprovementsAssignments from '../models/payrollImprovementsAssignments.js';
import PayrollRoleImprovements from '../models/payrollRoleImprovements.js';
import PayrollRole from '../models/payrollRoles.js';
import Improvement from '../models/improvements.js';

export const getAllUsers = async () => {
  const allUsers = await Users.findAll({ logging: false });

  const userChecks = allUsers.map(async user => {
    const progress = await OperationProgress.findOne({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
      logging: false,
    });

    if (
      progress && 
      progress.start_time !== null &&
      progress.month_id <= 12 &&
      progress.current_decade < 3
    ) {
      return user;
    }

    return null;
  });

  const results = await Promise.all(userChecks);

  return results.filter(user => user !== null);
};

export const getProgressForUser = async (userId) => {
  try {
    const progress = await OperationProgress.findOne({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      attributes: ['month_id', 'current_decade'],
      logging: false,
    });

    return progress ? progress : null;
  } catch (error) {
    console.error('Error al obtener el progreso del usuario:', error);
    return null;
  }
};

export const createMonthlyOperationsBulk = async (sales) => {
  try {
    if (!Array.isArray(sales) || sales.length === 0) return;

    await MonthlyOperation.bulkCreate(sales, {
      validate: true,
      logging: false
    });
  } catch (error) {
    console.error('Error al guardar ventas en bulk:', error);
  }
};

export const getPayrollAssignmentsForUser = async (userId) => {
  return await PayrollImprovementsAssignments.findAll({
    where: { created_by: userId },
    include: [
      {
        model: PayrollRoleImprovements,
        attributes: ['id'],
        include: [
          { model: PayrollRole, attributes: ['id', 'name'] },
          { model: Improvement, attributes: ['id', 'title', 'description', 'effect'] }
        ]
      }
    ],
    attributes: ['id', 'quantity'],
    order: [['role_improvement_id', 'ASC']],
    logging: false
  });
};
