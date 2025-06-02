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
                    attributes: ['id', 'name', 'lastName']
                }
            ]
        });

        const result = groups.map(group => {
            const groupData = group.dataValues;

            const studentsForGroup = groupStudents
                .filter(gs => gs.group_id === group.id)
                .map(gs => {
                    const s = gs.User;
                    return {
                        id: s.id,
                        name: s.name,
                        lastName: s.lastName,
                    };
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

const createGroup = async (req, reply) => {
    try {
        const { name, teacher_id, university_id, student_ids } = req.body;

        if (!name || !teacher_id || !university_id || !Array.isArray(student_ids)) {
            return reply.code(400).send({ ok: false, message: 'Faltan campos requeridos' });
        }

        const group = await Group.create({ name, teacher_id, university_id });

        const studentEntries = student_ids.map(student_id => ({
            group_id: group.id,
            student_id
        }));

        await GroupStudent.bulkCreate(studentEntries);

        return reply.code(201).send({ ok: true, message: 'Grupo creado exitosamente', group_id: group.id });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({ ok: false, message: 'Error al crear el grupo' });
    }
};

const updateGroup = async (req, reply) => {
    try {
        const { id } = req.params;
        const { name, teacher_id, university_id, student_ids } = req.body;

        if (!name || !teacher_id || !university_id || !Array.isArray(student_ids)) {
            return reply.code(400).send({ ok: false, message: 'Faltan campos requeridos' });
        }

        const group = await Group.findByPk(id);
        if (!group) {
            return reply.code(404).send({ ok: false, message: 'Grupo no encontrado' });
        }

        await group.update({ name, teacher_id, university_id });

        // Eliminar estudiantes anteriores
        await GroupStudent.destroy({ where: { group_id: id } });

        const newStudents = student_ids.map(student_id => ({
            group_id: id,
            student_id
        }));
        await GroupStudent.bulkCreate(newStudents);

        return reply.code(200).send({ ok: true, message: 'Grupo actualizado correctamente' });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({ ok: false, message: 'Error al actualizar el grupo' });
    }
};

const deleteGroup = async (req, reply) => {
    try {
        const { id } = req.params;

        const group = await Group.findByPk(id);
        if (!group) {
            return reply.code(404).send({ ok: false, message: 'Grupo no encontrado' });
        }

        await GroupStudent.destroy({ where: { group_id: id } });

        await group.destroy();

        return reply.code(200).send({ ok: true, message: 'Grupo eliminado correctamente' });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({ ok: false, message: 'Error al eliminar el grupo' });
    }
};


export {
    getGroupsWithStudents,
    createGroup,
    updateGroup,
    deleteGroup
};
