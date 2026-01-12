-- Ver cuántas tablas hay en el esquema
SELECT COUNT(*) 
FROM information_schema.tables
WHERE table_schema = 'public';

-- Ver la lista de nombres de todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Comprobar algunos conteos de filas clave
SELECT 'rol'                 AS tabla, COUNT(*) AS filas FROM rol
UNION ALL
SELECT 'users',               COUNT(*) FROM users
UNION ALL
SELECT 'financial_categories', COUNT(*) FROM financial_categories
UNION ALL
SELECT 'financial_titles',     COUNT(*) FROM financial_titles
UNION ALL
SELECT 'literals',             COUNT(*) FROM literals
UNION ALL
SELECT 'months',               COUNT(*) FROM months;

-- Ver datos de ejemplo
SELECT * FROM rol;
SELECT * FROM users    LIMIT 5;
SELECT * FROM financial_titles LIMIT 5;

-- Revisar secuencias (SERIAL)
SELECT last_value 
FROM rol_id_seq;  -- o el nombre real que tenga tu secuencia
