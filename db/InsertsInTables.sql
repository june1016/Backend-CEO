INSERT INTO rol (id, name_rol, created_at, updated_at) VALUES
(1, 'Administrador', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Users', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO literals (id, name, active, created_by, updated_by, created_at, updated_at) VALUES
(1, 'Activos corrientes', TRUE, 1, 1, NOW(), NOW()),
(2, 'Pasivos corrientes', TRUE, 1, 1, NOW(), NOW()),
(3, 'PPE (Propiedades, Planta y Equipo)', TRUE, 1, 1, NOW(), NOW()),
(4, 'Pasivo Largo Plazo', TRUE, 1, 1, NOW(), NOW()),
(5, 'Patrimonio', TRUE, 1, 1, NOW(), NOW()),
(6, 'Margen de utilidad sobre costo', TRUE, 1, 1, NOW(), NOW()),
(7, 'Indicadores objetivo', TRUE, 1, 1, NOW(), NOW()),
(8, 'Indicadores de liquidez y rentabilidad', TRUE, 1, 1, NOW(), NOW());

INSERT INTO units (id, name, active, created_by, updated_by, created_at, updated_at) VALUES
(1, '%', TRUE, 1, 1, NOW(), NOW()),
(2, '% Margen de utilidad', TRUE, 1, 1, NOW(), NOW()),
(3, 'COP', TRUE, 1, 1, NOW(), NOW()),
(4, 'Ratio', TRUE, 1, 1, NOW(), NOW());

INSERT INTO financial_categories (name) VALUES 
('activos'), ('Pasivos'), ('Patrimonio'), ('otros');

INSERT INTO financial_titles (name, category_id) VALUES 
('Dinero en caja', 1), 
('Dinero en banco', 1),
('Inventario', 1),
('Cuentas por cobrar', 1),
('Equipos de cómputo', 1),
('Muebles y enseres', 1),
('Maquinaria y equipo', 1),
('Patentes', 1),
('Cuentas por pagar', 2),
('Letras por pagar', 2),
('Deuda a largo plazo', 2),
('Capital social', 3),
('Utilidades retenidas', 3),
('Costos operativos', 4);

INSERT INTO financial_data (title_id, amount, created_by, updated_by, created_at, updated_at) VALUES
(1, 16060868.00, 1, 1, NOW(), NOW()),
(2, 62000000.00, 1, 1, NOW(), NOW()),
(3, 108653261.00, 1, 1, NOW(), NOW()),
(4, 45800000.00, 1, 1, NOW(), NOW()),
(5, 38000000.00, 1, 1, NOW(), NOW()),
(6, 95857171.00, 1, 1, NOW(), NOW()),
(7, 186500000.00, 1, 1, NOW(), NOW()),
(8, 5000000.00, 1, 1, NOW(), NOW()),
(9, 69580000.00, 1, 1, NOW(), NOW()),
(10, 28520000.00, 1, 1, NOW(), NOW()),
(11, 161436150.00, 1, 1, NOW(), NOW()),
(12, 253115150.00, 1, 1, NOW(), NOW()),
(13, 100000000.00, 1, 1, NOW(), NOW()),
(14, 19700000.00, 1, 1, NOW(), NOW());

INSERT INTO annual_objective_indicators (id, product, account, value, literal_id, created_by, updated_by, unit_id, created_at, updated_at) VALUES
(1, 'Alfaros', '', 35, 6, 1, 1, 2, NOW(), NOW()),
(2, 'Betacos', '', 35, 6, 1, 1, 2, NOW(), NOW()),
(3, 'Gamaroles', '', 35, 6, 1, 1, 2, NOW(), NOW()),
(4, '', 'Ingreso por ventas', 115000000, 7, 1, 1, 3, NOW(), NOW()),
(5, '', 'Costos totales', 41650000, 7, 1, 1, 3, NOW(), NOW()),
(6, '', 'Utilidad bruta', 73350000, 7, 1, 1, 3, NOW(), NOW()),
(7, '', 'Gastos Generales', 38560000, 7, 1, 1, 3, NOW(), NOW()),
(8, '', 'Utilidad operacional', 34790000, 7, 1, 1, 3, NOW(), NOW()),
(9, '', 'Impuestos', 11480700, 7, 1, 1, 3, NOW(), NOW()),
(10, '', 'Utilidad neta', 23309300, 7, 1, 1, 3, NOW(), NOW()),
(11, '', 'Razon corriente', 2.5, 8, 1, 1, 1, NOW(), NOW()),
(12, '', 'Prueba acida', 3.0, 8, 1, 1, 1, NOW(), NOW()),
(13, '', 'Margen bruto', 45.00, 8, 1, 1, 1, NOW(), NOW()),
(14, '', 'Margen operacional', 28.00, 8, 1, 1, 1, NOW(), NOW()),
(15, '', 'Margen neto', 19.00, 8, 1, 1, 1, NOW(), NOW()),
(16, '', 'Ebitda', 18000000.00, 8, 1, 1, 1, NOW(), NOW()),
(17, '', 'Nivel de endeudamiento', 42.00, 8, 1, 1, 1, NOW(), NOW()),
(18, '', 'Rent del patrimonio', 26.00, 8, 1, 1, 1, NOW(), NOW()),
(19, '', 'Rentabilidad del activo', 35.00, 8, 1, 1, 1, NOW(), NOW()),
(20, '', 'Capital de trabajo', 8500000.00, 8, 1, 1, 1, NOW(), NOW());







