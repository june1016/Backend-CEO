if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config');
}

import env from 'env-var';

const { get } = env;
/**
 * @const {Object} envs - Object defining environment variables using the `env-var` library
 * to retrieve and validate values from the environment.
 *
 * @author Juan Sebastian Gonzalez Sosssa
 * @date   20-01-2025
 */
const envs = {
  HOST: get('HOST').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  LOGS_PATH: get('LOGS_PATH').required().asString(),
  VERSION: get('VERSION').required().asString(),
  MODE: get('MODE').required().asString(),

  DB_HOST: get('DB_HOST').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_NAME: get('DB_NAME').required().asString(),
  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_TYPE: get('DB_TYPE').required().asString(),
  DB_TIMEZONE: get('DB_TIMEZONE').required().asString(),

  JWT_SECRET: get('JWT_SECRET').required().asString(),
  TIME_EXPIRED: get('TIME_EXPIRED').required().asString(),

  EMAIL_USER: get('EMAIL_USER').required().asString(),
  EMAIL_PASS: get('EMAIL_PASS').required().asString()
};

export default envs;
