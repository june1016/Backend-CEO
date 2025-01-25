import Sequelize from 'sequelize';
import envs from './envs.js';

/**
 * Creates a connection to a database using Sequelize with the provided environment variables.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
*/
const connectToDatabase = () =>
  new Sequelize({
    dialect: envs.DB_TYPE,
    schema: envs.SCHEMA,
    database: envs.DB_NAME,
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    timezone: envs.DB_TIMEZONE,
  });

export default connectToDatabase;
