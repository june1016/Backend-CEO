INSERT INTO literals (id, name, active, created_by, updated_by, created_at, updated_at) VALUES
(1, 'Activos corrientes', TRUE, 1, 1, NOW(), NOW()),
(2, 'Pasivos corrientes', TRUE, 1, 1, NOW(), NOW()),
(3, 'PPE (Propiedades, Planta y Equipo)', TRUE, 1, 1, NOW(), NOW()),
(4, 'Pasivo Largo Plazo', TRUE, 1, 1, NOW(), NOW()),
(5, 'Patrimonio', TRUE, 1, 1, NOW(), NOW()),
(6, 'Margen de utilidad sobre costo', TRUE, 1, 1, NOW(), NOW()),
(7, 'Indicadores objetivo', TRUE, 1, 1, NOW(), NOW()),
(8, 'Indicadores de liquidez y rentabilidad', TRUE, 1, 1, NOW(), NOW());

INSERT INTO beginning_balance_sheet (id, account, amount, literal_id, created_by, updated_by, created_at, updated_at) VALUES
(1, 'Cuenta', 0.00, 1, 1, 1, NOW(), NOW()),
(2, 'Bancos', 0.00, 1, 1, 1, NOW(), NOW()),
(3, 'Cuentas por cobrar', 0.00, 1, 1, 1, NOW(), NOW()),
(4, 'Inventarios', 0.00, 1, 1, 1, NOW(), NOW()),
(5, 'Inversiones temporales', 0.00, 1, 1, 1, NOW(), NOW()),
(6, 'CXP (Cuentas por pagar)', 0.00, 2, 1, 1, NOW(), NOW()),
(7, 'Letras por pagar', 0.00, 2, 1, 1, NOW(), NOW()),
(8, 'Muebles y enseres', 0.00, 3, 1, 1, NOW(), NOW()),
(9, 'Patentes', 0.00, 3, 1, 1, NOW(), NOW()),
(10, 'Maquinarias', 0.00, 3, 1, 1, NOW(), NOW()),
(11, 'Equipos oficina', 0.00, 3, 1, 1, NOW(), NOW()),
(12, 'Obligaciones Final LP', 0.00, 4, 1, 1, NOW(), NOW()),
(13, 'Capital', 0.00, 5, 1, 1, NOW(), NOW());

INSERT INTO units (id, name, active, created_by, updated_by, created_at, updated_at) VALUES
(1, '%', TRUE, 1, 1, NOW(), NOW()),
(2, '% Margen de utilidad', TRUE, 1, 1, NOW(), NOW()),
(3, 'COP', TRUE, 1, 1, NOW(), NOW()),
(4, 'Ratio', TRUE, 1, 1, NOW(), NOW());

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

INSERT INTO financial_data (id, title, category, amount, initial_amount, created_by, updated_by, created_at, updated_at) VALUES
(1, 'Dinero en caja', 'activos', 16060868.00, 0.00, 1, 1, NOW(), NOW()),
(2, 'Dinero en banco', 'activos', 62000000.00, 0.00, 1, 1, NOW(), NOW()),
(3, 'Inventario', 'activos', 108653261.00, 0.00, 1, 1, NOW(), NOW()),
(4, 'Cuentas por cobrar', 'activos', 45800000.00, 0.00, 1, 1, NOW(), NOW()),
(5, 'Equipos de cómputo', 'activos', 38000000.00, 0.00, 1, 1, NOW(), NOW()),
(6, 'Muebles y enseres', 'activos', 95857171.00, 0.00, 1, 1, NOW(), NOW()),
(7, 'Maquinaria y equipo', 'activos', 186500000.00, 0.00, 1, 1, NOW(), NOW()),
(8, 'Patentes', 'activos', 5000000.00, 0.00, 1, 1, NOW(), NOW()),
(9, 'Cuentas por pagar', 'Pasivos', 69580000.00, 0.00, 1, 1, NOW(), NOW()),
(10, 'Letras por pagar', 'Pasivos', 28520000.00, 0.00, 1, 1, NOW(), NOW()),
(11, 'Deuda a largo plazo', 'Pasivos', 161436150.00, 0.00, 1, 1, NOW(), NOW()),
(12, 'Capital social', 'Patrimonio', 253115150.00, 0.00, 1, 1, NOW(), NOW()),
(13, 'Utilidades retenidas', 'Patrimonio', 100000000.00, 0.00, 1, 1, NOW(), NOW()),
(14, 'Costos operativos', 'otros', 19700000.00, 0.00, 1, 1, NOW(), NOW());








