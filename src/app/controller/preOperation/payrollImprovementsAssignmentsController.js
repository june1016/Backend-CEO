import { logger } from '../../../config/index.js';
import PayrollImprovementsAssignments from '../../models/payrollImprovementsAssignments.js';
import PayrollRole from '../../models/payrollRoles.js'; 
import PayrollConfiguration from '../../models/payrollConfiguration.js';
import PayrollRoleImprovements from '../../models/payrollRoleImprovements.js';
import Improvement from '../../models/improvements.js';

const createPayrollImprovementsAssignments = async (req, reply) => {
  const assignments = req.body;

  try {
    if (!Array.isArray(assignments) || assignments.length === 0) {
      return reply.status(400).send({ message: 'El cuerpo de la solicitud debe contener un arreglo de asignaciones' });
    }

    const isValid = assignments.every(assignment => {
      return assignment.role_improvement_id && assignment.configuration_id && assignment.quantity && assignment.created_by;
    });

    if (!isValid) {
      return reply.status(400).send({ message: 'Cada asignación debe contener role_improvement_id, configuration_id, quantity y created_by' });
    }

    const newAssignments = await PayrollImprovementsAssignments.bulkCreate(assignments);

    return reply.status(201).send({
      message: 'Asignaciones creadas correctamente',
      data: newAssignments,
    });
  } catch (error) {
    logger.error(error);
    return reply.status(500).send({ message: 'Error al crear las asignaciones', error: error.message });
  }
};

const getPayrollForUser = async (req, reply) => {
  const userId = req.params.user_id;

  try {
    const payrollAssignments = await PayrollImprovementsAssignments.findAll({
      where: {
        created_by: userId 
      },
      include: [
        {
          model: PayrollConfiguration,
          attributes: ['id', 'name'],
        },
        {
          model: PayrollRoleImprovements,
          attributes: ['id'],
          include: [
            {
              model: PayrollRole,
              attributes: ['id', 'name']
            },
            {
              model: Improvement,
              attributes: ['id', 'title', 'description', 'effect']
            }
          ]
        }
      ],
      loggging: false,
      attributes: ['id', 'quantity'],
      order: [['role_improvement_id', 'ASC']]
    });

    if (!payrollAssignments.length) {
      return reply.status(404).send({ message: 'No se encontraron asignaciones de nómina para este usuario' });
    }

    return reply.status(200).send({
      message: 'Asignaciones de nómina encontradas',
      data: payrollAssignments
    });
  } catch (error) {
    logger.error(error.message);
    return reply.status(500).send({ message: 'Error al obtener las asignaciones de nómina', error: error.message });
  }
};

export {
    createPayrollImprovementsAssignments,
    getPayrollForUser
}
