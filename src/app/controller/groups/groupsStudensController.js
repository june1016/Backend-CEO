import GroupStudent from '../../models/groupStudent.js';
import Group from '../../models/group.js';
import logger from '../../../config/logger.js';

const getTeacherIdByStudent = async (req, reply) => {
  try {
    const { student_id } = req.query;

    if (!student_id) {
      return reply.code(400).send({ ok: false, message: 'student_id requerido' });
    }

    const groupStudent = await GroupStudent.findOne({ where: { student_id } });

    if (!groupStudent) {
      return reply.code(404).send({ ok: false, message: 'Estudiante no está asignado a ningún grupo' });
    }

    const group = await Group.findByPk(groupStudent.group_id);

    if (!group) {
      return reply.code(404).send({ ok: false, message: 'Grupo no encontrado' });
    }

    return reply.code(200).send({
      ok: true,
      teacher_id: group.teacher_id,
    });
  } catch (error) {
    logger.error(error.message);
    return reply.code(500).send({
      ok: false,
      message: 'Error al obtener el teacher_id',
    });
  }
};

export { getTeacherIdByStudent };