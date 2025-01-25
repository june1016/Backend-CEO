import { envs } from '../config/index.js';

/**
 * Retrieves the version from environment variables using Fastify.
 * @param {Object} fastify - Fastify framework instance for building web applications.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const getVersion = async (fastify) => {
  fastify.get('/', async () => ({ version: envs.VERSION }));
};

export default getVersion;
