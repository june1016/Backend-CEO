import MachineShiftAssignment from '../../models/machineShiftAssignment.js';
import Machine from '../../models/machine.js';
import Product from '../../models/products.js';
import Shift from '../../models/shifts.js';
import logger from '../../../config/logger.js';

const getMachineShiftAssignmentsByUser = async (req, reply) => {

    const userId = req.params.user_id;

    try {
        const assignments = await MachineShiftAssignment.findAll({
            where: { created_by: userId },
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

const createMachineShiftAssignments = async (req, reply) => {
    const assignments = req.body;
  
    try {
      if (!Array.isArray(assignments) || assignments.length === 0) {
        return reply.status(400).send({ message: 'El cuerpo de la solicitud debe contener un arreglo de asignaciones' });
      }
  
      const isValid = assignments.every(assignment => {
        return assignment.machine_id && assignment.shift_id && assignment.created_by;
      });
  
      if (!isValid) {
        return reply.status(400).send({ message: 'Cada asignación debe contener machine_id, shift_id y created_by' });
      }
  
      for (let assignment of assignments) {
        const existingAssignment = await MachineShiftAssignment.findOne({
          where: {
            machine_id: assignment.machine_id,
            shift_id: assignment.shift_id,
            created_by: assignment.created_by,
          },
        });
  
        if (existingAssignment) {
          await existingAssignment.update({
            shift_id: assignment.shift_id,
          });
        } else {
          await MachineShiftAssignment.create(assignment);
        }
      }
  
      return reply.status(201).send({
        ok: true,
        message: 'Asignaciones de turno creadas o actualizadas correctamente',
      });
    } catch (error) {
      logger.error(error);
      return reply.status(500).send({ message: 'Error al crear o actualizar las asignaciones de turno', error: error.message });
    }
  };

export {
    getMachineShiftAssignmentsByUser,
    createMachineShiftAssignments
};
