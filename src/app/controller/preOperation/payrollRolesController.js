import PayrollRole from '../../models/payrollRoles.js';
import Improvement from '../../models/improvements.js';
import PayrollRoleImprovements from '../../models/payrollRoleImprovements.js';
import { logger } from '../../../config/index.js';

const getPayrollRolesWithImprovements = async (req, reply) => {
  try {
    const roleImprovements = await PayrollRoleImprovements.findAll({
      include: [
        {
          model: Improvement,
          attributes: ['id', 'title', 'description', 'effect'],
        },
        {
          model: PayrollRole,
          attributes: ['id', 'name'], 
        },
      ],
      attributes: ['id', 'role_id', 'improvement_id'], 
    });

    return reply.code(200).send({
      ok: true,
      statusCode: 200,
      message: "Nomina del personal obtenida correctamente.",
      roleImprovements,
    });
  } catch (error) {
    logger.error("Error obteniendo nomina del personal:", error);
    return reply.code(500).send({
      ok: false,
      statusCode: 500,
      message: "Se produjo un error al obtener la nomina del personal.",
    });
  }
};

export {
  getPayrollRolesWithImprovements
}