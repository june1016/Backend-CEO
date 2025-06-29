/**
 * testConnection.js
 * Este script verifica la conexión a la base de datos PostgreSQL usando Sequelize.
 * Instrucciones:
 * 1. Asegúrate de tener un archivo .env en la raíz con las variables:
 *    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
 * 2. Ejecuta: node testConnection.js
 */

import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Configura la instancia de Sequelize con tus variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Conexión a la base de datos exitosa.');
} catch (error) {
  console.error('❌ No se pudo conectar a la base de datos:', error);
  process.exit(1);
} finally {
  await sequelize.close();
}
