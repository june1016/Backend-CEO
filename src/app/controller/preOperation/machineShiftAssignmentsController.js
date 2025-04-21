import MachineShiftAssignment from '../../models/machineShiftAssignment.js';
import Machine from '../../models/machine.js';
import Product from '../../models/products.js';
import Shift from '../../models/shifts.js';
import logger from '../../../config/logger.js';

const postMachineShiftAssignmentsByUser = async (req, reply) => {
    const { created_by } = req.body;

    try {
        const assignments = await MachineShiftAssignment.findAll({
            where: { created_by },
            include: [
                {
                    model: Machine,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: Shift,
                    attributes: ['id', 'name', 'start_time', 'end_time']
                }
            ],
            logging: false,
            attributes: ['id', 'operator_count']
        });

        // Agrupamos por producto
        const groupedByProduct = {};
        for (const assignment of assignments) {
            const product = assignment.Machine?.Product;
            if (!product) continue;

            const productId = product.id;
            const productName = product.name;

            if (!groupedByProduct[productId]) {
                groupedByProduct[productId] = {
                    product_id: productId,
                    product_name: productName,
                    machines: {}
                };
            }

            const machine = assignment.Machine;
            if (!groupedByProduct[productId].machines[machine.id]) {
                groupedByProduct[productId].machines[machine.id] = {
                    machine_id: machine.id,
                    machine_name: machine.name,
                    shifts: []
                };
            }

            groupedByProduct[productId].machines[machine.id].shifts.push({
                shift_id: assignment.Shift.id,
                shift_name: assignment.Shift.name,
                start_time: assignment.Shift.start_time,
                end_time: assignment.Shift.end_time,
                operator_count: assignment.operator_count
            });
        }

        const result = Object.values(groupedByProduct).map(product => ({
            ...product,
            machines: Object.values(product.machines)
        }));

        return reply.status(200).send({
            message: 'Asignaciones de turnos agrupadas por producto y máquina',
            data: result
        });
    } catch (error) {
        logger.error('Error getting machine shift assignments by user:', error);
        return reply.status(500).send({
            message: 'Error al obtener asignaciones',
            error: error.message
        });
    }
};

const createMachineShiftAssignment = async (req, reply) => {
  const { created_by, assignments } = req.body;

  try {
    if (!Array.isArray(assignments) || assignments.length === 0) {
      return reply.status(400).send({
        message: 'Debe proporcionar al menos una asignación para registrar.'
      });
    }

    const dataToCreate = assignments.map((assignment) => ({
      configuration_id: assignment.configuration_id,
      machine_id: assignment.machine_id,
      shift_id: assignment.shift_id,
      operator_count: assignment.operator_count || 0,
      created_by,
      updated_by: created_by
    }));

    const savedAssignments = await MachineShiftAssignment.bulkCreate(dataToCreate, {
      ignoreDuplicates: true,
      returning: true,
      logging: false
    });

    return reply.status(201).send({
      message: 'Asignaciones creadas exitosamente.',
      data: savedAssignments,
    });
  } catch (error) {
    console.error('Error al crear asignaciones:', error);
    return reply.status(500).send({
      message: 'Error al crear las asignaciones',
      error: error.message,
    });
  }
};

export {
    postMachineShiftAssignmentsByUser,
    createMachineShiftAssignment
};
