INSERT INTO rol (id, name_rol) VALUES
(1, 'Administrador'),
(2, 'Users');

INSERT INTO literals (id, name, active, created_by, updated_by) VALUES
(1, 'Activos corrientes', TRUE, 1, 1),
(2, 'Pasivos corrientes', TRUE, 1, 1),
(3, 'PPE (Propiedades, Planta y Equipo)', TRUE, 1, 1),
(4, 'Pasivo Largo Plazo', TRUE, 1, 1),
(5, 'Patrimonio', TRUE, 1, 1),
(6, 'Margen de utilidad sobre costo', TRUE, 1, 1),
(7, 'Indicadores objetivo', TRUE, 1, 1),
(8, 'Indicadores de liquidez y rentabilidad', TRUE, 1, 1);

INSERT INTO units (id, name, active, created_by, updated_by) VALUES
(1, '%', TRUE, 1, 1),
(2, '% Margen de utilidad', TRUE, 1, 1),
(3, 'COP', TRUE, 1, 1),
(4, 'Ratio', TRUE, 1, 1);

INSERT INTO financial_categories (name) VALUES 
('activos'), ('Pasivos'), ('Patrimonio'), ('otros');

INSERT INTO financial_titles (name, category_id) VALUES 
('Dinero en caja', 1), 
('Dinero en banco', 1),
('Cuentas por cobrar', 1),
('Inventario', 1),
('Equipos de oficina', 1),
('Muebles y enseres', 1),
('Maquinaria y equipo', 1),
('Patentes', 1),
('Cuentas por pagar', 2),
('Letras por pagar', 2),
('Deuda a largo plazo', 2),
('Capital social', 3),
('Utilidades retenidas', 3),
('Costos operativos', 4);

INSERT INTO financial_data (title_id, literal_id, amount, created_by, updated_by) VALUES
(1, 1, 16060868.00, 1, 1),
(2, 1, 62000000.00, 1, 1),
(3, 1, 108653261.00, 1, 1),
(4, 1, 45800000.00, 1, 1),
(5, 3, 38000000.00, 1, 1),
(6, 3, 95857171.00, 1, 1),
(7, 3, 186500000.00, 1, 1),
(8, 3, 5000000.00, 1, 1),
(9, 2, 69580000.00, 1, 1),
(10, 2, 28520000.00, 1, 1),
(11, 3, 161436150.00, 1, 1),
(12, 4, 253115150.00, 1, 1),
(13, 4, 100000000.00, 1, 1),
(14, 3, 19700000.00, 1, 1);

INSERT INTO indicator_titles (name) VALUES 
('Betacos'), 
('Alfaros'),
('Gamaroles'),
('Ingreso por ventas'),
('Costos totales'),
('Utilidad bruta'),
('Gastos Generales'),
('Utilidad operacional'),
('Impuestos'),
('Utilidad neta'),
('Razon corriente'),
('Prueba acida'),
('Margen bruto'),
('Margen operacional'),
('Margen neto'),
('Ebitda'),
('Nivel de endeudamiento'),
('Rent del patrimonio'),
('Rentabilidad del activo'),
('Capital de trabajo');

INSERT INTO annual_objective_indicators (title_id, value, literal_id, created_by, updated_by, unit_id) VALUES
(1, 35, 6, 1, 1, 2),
(2, 35, 6, 1, 1, 2),
(3, 35, 6, 1, 1, 2),
(4, 115000000, 7, 1, 1, 3),
(5, 41650000, 7, 1, 1, 3),
(6, 73350000, 7, 1, 1, 3),
(7, 38560000, 7, 1, 1, 3),
(8, 34790000, 7, 1, 1, 3),
(9, 11480700, 7, 1, 1, 3),
(10, 23309300, 7, 1, 1, 3),
(11, 2.5, 8, 1, 1, 1),
(12, 3.0, 8, 1, 1, 1),
(13, 45.00, 8, 1, 1, 1),
(14, 28.00, 8, 1, 1, 1),
(15, 19.00, 8, 1, 1, 1),
(16, 18000000.00, 8, 1, 1, 1),
(17, 42.00, 8, 1, 1, 1),
(18, 26.00, 8, 1, 1, 1),
(19, 35.00, 8, 1, 1, 1),
(20, 8500000.00, 8, 1, 1, 1);







