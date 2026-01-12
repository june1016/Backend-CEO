import 'dotenv/config';
import { Sequelize } from 'sequelize';

const required = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
for (const envVar of required) {
  if (!process.env[envVar]) {
    console.error(`❌ Falta la variable: ${envVar}`);
    process.exit(1);
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necesario para evitar errores de certificado
      }
    },
    logging: false
  }
);

console.log('🔌 Conectando a Supabase (Session Pooler)...');

try {
  await sequelize.authenticate();
  console.log('✅ ¡Conexión exitosa!');
} catch (error) {
  console.error('❌ Error de conexión:');
  console.error(error.message);
  process.exit(1);
} finally {
  await sequelize.close();
  console.log('👋 Conexión cerrada.');
}