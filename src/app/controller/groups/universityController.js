import University from '../../models/university.js';
import logger from '../../../config/logger.js';

const getAllUniversities = async (_req, reply) => {
    try {
        const universities = await University.findAll({
            attributes: ['id', 'name', 'city', 'country', 'created_at', 'updated_at']
        });

        return reply.code(200).send({
            ok: true,
            universities
        });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({
            ok: false,
            message: 'Error al obtener las universidades'
        });
    }
};

const createUniversity = async (req, reply) => {
    const { name, city, country } = req.body;

    try {
        if (!name || !city || !country) {
            return reply.code(400).send({
                ok: false,
                message: 'Todos los campos (name, city, country) son obligatorios',
            });
        }

        const newUniversity = await University.create({ name, city, country });

        return reply.code(201).send({
            ok: true,
            message: 'Universidad creada con éxito',
            university: newUniversity,
        });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({
            ok: false,
            message: 'Error al crear la universidad',
        });
    }
};

const updateUniversity = async (req, reply) => {
    const { id } = req.params;
    const { name, city, country } = req.body;

    try {
        const university = await University.findByPk(id);

        if (!university) {
            return reply.code(404).send({
                ok: false,
                message: 'Universidad no encontrada',
            });
        }

        university.name = name || university.name;
        university.city = city || university.city;
        university.country = country || university.country;

        await university.save();

        return reply.code(200).send({
            ok: true,
            message: 'Universidad actualizada correctamente',
            university,
        });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({
            ok: false,
            message: 'Error al actualizar la universidad',
        });
    }
};

const deleteUniversity = async (req, reply) => {
    const { id } = req.params;

    try {
        const university = await University.findByPk(id);

        if (!university) {
            return reply.code(404).send({
                ok: false,
                message: 'Universidad no encontrada',
            });
        }

        await university.destroy();

        return reply.code(200).send({
            ok: true,
            message: 'Universidad eliminada correctamente',
        });
    } catch (error) {
        logger.error(error.message);
        return reply.code(500).send({
            ok: false,
            message: 'Error al eliminar la universidad',
        });
    }
};



export {
    getAllUniversities,
    createUniversity,
    deleteUniversity,
    updateUniversity
};
