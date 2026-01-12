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
        // Mostrar (de forma segura) las variables de entorno relevantes para depuración
        console.log('🔎 Variables de entorno utilizadas:');
        console.log(`   - Host: ${process.env.DB_HOST}`);
        console.log(`   - Puerto: ${process.env.DB_PORT}`);
        console.log(`   - Base de datos: ${process.env.DB_NAME}`);
        console.log(`   - Usuario: ${process.env.DB_USER}`);
        console.log(`   - Tipo/Dialect: postgres`);
        console.log(`   - Timezone: ${process.env.DB_TIMEZONE}`);
        // No mostrar la contraseña completa por seguridad, sólo su longitud
        console.log(`   - Password length: ${process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0}`);
        
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
        // Mensajes de error más descriptivos y volcado completo para depuración
        // Primero intentamos mapear códigos comunes
        switch (error.original?.code || error.parent?.code) {
            case 'ECONNREFUSED':
                console.error('   No se pudo conectar al servidor de base de datos (ECONNREFUSED)');
                console.error('   Verifica que:');
                console.error('   - El servidor PostgreSQL esté en ejecución');
                console.error('   - El host y puerto sean correctos');
                console.error('   - El firewall permita la conexión');
                break;
            case '28P01':
                console.error('   Error de autenticación (28P01)');
                console.error('   Verifica que el usuario y contraseña sean correctos');
                break;
            case '3D000':
                console.error('   La base de datos no existe (3D000)');
                console.error('   Verifica el nombre de la base de datos');
                break;
            default:
                // Si no es un código conocido, imprimimos el mensaje y volcado completo
                console.error(`   Mensaje: ${error.message}`);
        }

        // Volcar información completa del error para diagnóstico (sin exponer contraseña)
        try {
            console.error('--- Detalle completo del error ---');
            // error.original y error.parent contienen detalles del driver/pg
            console.error('error.name:', error.name);
            console.error('error.message:', error.message);
            if (error.original) console.error('error.original:', JSON.stringify(error.original, Object.getOwnPropertyNames(error.original)));
            if (error.parent) console.error('error.parent:', JSON.stringify(error.parent, Object.getOwnPropertyNames(error.parent)));
            console.error('error.stack:', error.stack);
            console.error('----------------------------------');
        } catch (dumpErr) {
            console.error('No fue posible serializar el error completo:', dumpErr);
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