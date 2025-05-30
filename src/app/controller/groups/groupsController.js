import logger from '../../../config/logger.js';
import Group from '../../models/group.js';
import GroupStudent from '../../models/groupStudent.js';
import Users from '../../models/users.js';
import University from '../../models/university.js';

const getGroupsWithStudents = async (_req, reply) => {
    try {
        const groups = await Group.findAll({
            attributes: ['id', 'name', 'teacher_id'],
            include: [
                {
                    model: Users,
                    attributes: ['name', 'lastName'],
                },
                {
                    model: University,
                    attributes: ['name']
                }
            ]
        });

        const groupStudents = await GroupStudent.findAll({
            attributes: ['group_id', 'student_id'],
            include: [
                {
                    model: Users,
                    attributes: ['name', 'lastName']
                }
            ]
        });

        const result = groups.map(group => {
            const groupData = group.dataValues;

            const studentsForGroup = groupStudents
                .filter(gs => gs.group_id === group.id)
                .map(gs => {
                    const s = gs.User;
                    return `${s.name} ${s.lastName}`;
                });

            return {
                id: groupData.id,
                name: groupData.name,
                teacher: `${groupData.User?.name || 'Sin'} ${groupData.User?.lastName || 'Docente'}`,
                university: groupData.University?.name || 'Sin universidad',
                students: studentsForGroup
            };
        });

        return reply.code(200).send({
            ok: true,
            groups: result
        });

    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({
            ok: false,
            message: 'Error al obtener los grupos con estudiantes'
        });
    }
};


export {
    getGroupsWithStudents
};
