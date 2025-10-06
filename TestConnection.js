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

// Validar variables de entorno críticas
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_HOST', 'DB_PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Error: Faltan variables de entorno requeridas:', missingVars.join(', '));
    console.log('💡 Asegúrate de tener un archivo .env con las variables requeridas');
    process.exit(1);
}

// Configura la instancia de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        // Agregar opciones adicionales de seguridad
        dialectOptions: {
            connectTimeout: 10000 // 10 segundos de timeout
        },
        retry: {
            max: 2 // Intentar reconectar hasta 2 veces
        }
    }
);

// Función para probar la conexión
async function testConnection() {
    try {
        console.log('🔄 Intentando conectar con la base de datos...');
        
        await sequelize.authenticate();
        console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
        
        // Mostrar información de la conexión (sin contraseña por seguridad)
        console.log('📊 Información de la conexión:');
        console.log(`   - Host: ${process.env.DB_HOST}`);
        console.log(`   - Puerto: ${process.env.DB_PORT}`);
        console.log(`   - Base de datos: ${process.env.DB_NAME}`);
        console.log(`   - Usuario: ${process.env.DB_USER}`);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error de conexión a la base de datos:');
        
        // Mensajes de error más descriptivos
        switch (error.original?.code) {
            case 'ECONNREFUSED':
                console.error('   No se pudo conectar al servidor de base de datos');
                console.error('   Verifica que:');
                console.error('   - El servidor PostgreSQL esté en ejecución');
                console.error('   - El host y puerto sean correctos');
                console.error('   - El firewall permita la conexión');
                break;
            case '28P01':
                console.error('   Error de autenticación');
                console.error('   Verifica que el usuario y contraseña sean correctos');
                break;
            case '3D000':
                console.error('   La base de datos no existe');
                console.error('   Verifica el nombre de la base de datos');
                break;
            default:
                console.error(`   ${error.message}`);
        }
        
        return false;
        
    } finally {
        // Cerrar la conexión siempre
        await sequelize.close();
        console.log('🔒 Conexión cerrada');
    }
}

// Ejecutar la prueba
async function main() {
    const success = await testConnection();
    
    if (success) {
        console.log('🎉 ¡Prueba de conexión completada con éxito!');
        process.exit(0);
    } else {
        console.log('💥 Prueba de conexión fallida');
        process.exit(1);
    }
}

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('Error no manejado:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('Excepción no capturada:', err);
    process.exit(1);
});

// Ejecutar la aplicación
main();