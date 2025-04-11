INSERT INTO rol (id, name_rol) VALUES
(1, 'Administrador'),
(2, 'Users');

INSERT INTO users (email, "password", "name", last_name) VALUES
('administradorceo@gmail.com', '$2a$10$8LHmiv1wkvI9SELwGkw.JOom.GT0A.tLDSGAXMqsk.ut85weRSzoG', 'Administrador', 'Ceo');

INSERT INTO users_by_rol (user_id, rol_id) VALUES
(1, 1);

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
('Activos'), ('Pasivos'), ('Patrimonio'), ('Otros');

INSERT INTO financial_titles (name, category_id) VALUES 
('Dinero en caja', 1), 
('Dinero en banco', 1),
('Inventario', 1),
('Cuentas por cobrar', 1),
('Maquinaria y equipo', 1),
('Equipos de cómputo', 1),
('Muebles y enseres', 1),
('Patentes', 1),
('Cuentas por pagar', 2),
('Letras por pagar', 2),
('Deuda a largo plazo', 2),
('Capital social', 3),
('Utilidades retenidas', 3);

INSERT INTO financial_data (title_id, literal_id, amount, icon, created_by, updated_by) VALUES
(1, 1, 25000000.00, 'Wallet', 1, 1),
(2, 1, 95000000.00, 'AccountBalance', 1, 1),
(3, 1, 120000000.00, 'Inventory', 1, 1),
(4, 1, 60000000.00, 'Receipt', 1, 1),
(5, 1, 180000000.00, 'Build', 1, 1),
(6, 1, 40000000.00, 'Computer', 1, 1),
(7, 1, 30000000.00, 'MenuBook', 1, 1),
(8, 1, 50000000.00, 'EmojiEvents', 1, 1),
(9, 2, 60000000.00, 'CreditCard', 1, 1),
(10, 2, 30000000.00, 'Description', 1, 1),
(11, 2, 150000000.00, 'Apartment', 1, 1),
(12, 3, 300000000.00, 'Work', 1, 1),
(13, 3, 60000000.00, 'Savings', 1, 1);

INSERT INTO indicator_titles (name) VALUES 
('Betacos'), 
('Alfaros'),
('Gamaroles'),
('Ingreso por ventas'),
('Costos totales'),
('Utilidad bruta'),
('Gastos generales'),
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
('Rentabilidad del patrimonio'),
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
(11, 2.37, 8, 1, 1, 1),
(12, 1.90, 8, 1, 1, 1),
(13, 63.78, 8, 1, 1, 1),
(14, 30.25, 8, 1, 1, 1),
(15, 20.27, 8, 1, 1, 1),
(16, 18000000.00, 8, 1, 1, 1),
(17, 46.48, 8, 1, 1, 1),
(18, 6.60, 8, 1, 1, 1),
(19, 4.17, 8, 1, 1, 1),
(20, 8500000.00, 8, 1, 1, 1);

INSERT INTO months (id, name, created_by, updated_by) VALUES
(0, 'Configuracion', 1, 1),
(1, 'Enero', 1, 1),
(2, 'Febrero', 1, 1),
(3, 'Marzo', 1, 1),
(4, 'Abril', 1, 1),
(5, 'Mayo', 1, 1),
(6, 'Junio', 1, 1),
(7, 'Julio', 1, 1),
(8, 'Agosto', 1, 1),
(9, 'Septiembre', 1, 1),
(10, 'Octubre', 1, 1),
(11, 'Noviembre', 1, 1),
(12, 'Diciembre', 1, 1);

INSERT INTO products (name, quantity, unit_cost, created_by, updated_by) VALUES 
('Alfaros', 320, 139500, 1, 1),
('Betacos', 250, 132000, 1, 1),
('Gamaroles', 180, 123000, 1, 1);

INSERT INTO sales (product_id, value_cop, created_by, updated_by) VALUES 
(1, 792000000, 1, 1),
(2, 648000000, 1, 1),
(3, 360000000, 1, 1);

INSERT INTO sales_costs (product_id, value_cop, created_by, updated_by) VALUES 
(1, 475200000, 1, 1),
(2, 388800000, 1, 1),
(3, 216000000, 1, 1);

INSERT INTO operating_expenses (type, value_cop, created_by, updated_by) VALUES 
('Gastos de Administración', 198000000, 1, 1),
('Gastos de Ventas', 162000000, 1, 1),
('Otros Gastos Operativos', 90000000, 1, 1);

INSERT INTO other_expenses (concept, value_cop, created_by, updated_by) VALUES 
('Gastos Financieros', 72000000, 1, 1),
('Depreciación y Amortización', 60000000, 1, 1),
('Impuestos', 30000000, 1, 1);

INSERT INTO operating_costs (name, value_cop, created_by, updated_by) VALUES 
('Arrendamiento', 12000000, 1, 1),
('Servicios Públicos', 8000000, 1, 1),
('Mantenimiento', 7500000, 1, 1),
('Telefonía móvil', 2000000, 1, 1),
('Cafetería y Papelería', 3000000, 1, 1),
('Otros gastos operativos', 5000000, 1, 1);

INSERT INTO financial_obligations (name, value_cop, created_by, updated_by) VALUES 
('Abono a Cuentas x pagar', 1500000, 1, 1),
('Abono Máquina 1 (NRX31 - Alfaros)', 1500000, 1, 1),
('Abono Máquina 2 (XLG77 - Betacos)', 1200000, 1, 1),
('Abono Máquina 3 (CP23H - Gamaroles)', 1000000, 1, 1),
('Abono otras inversiones', 800000, 1, 1);

INSERT INTO personnel_expenses (name, quantity, value_cop, note, created_by, updated_by) VALUES 
('Nómina Gerente (CEO)', 1, 6000000, 'Obligatorio - El CEO asume rol administrativo', 1, 1),
('Nómina Vendedor', 1, 0, 'Mínimo requerido (1 × <salario>)', 1, 1),
('Nómina operarios', 3, 5400000, 'Mínimo requerido (3 × 1.800.000)', 1, 1);

INSERT INTO social_charges (name, value_cop, created_by, updated_by) VALUES 
('PRESTACIONES-POS', 5100000, 1, 1);

INSERT INTO raw_materials_inventory (code, description, quantity, unit, unit_cost, created_by, updated_by) VALUES 
('A1', 'Material A1', 2500, 'LIBRAS', 8000, 1, 1),
('A2', 'Material A2', 1500, 'LITROS', 12000, 1, 1),
('A3', 'Material A3', 1800, 'KILOS', 9500, 1, 1),
('A4', 'Material A4', 2200, 'UNIDADES', 7500, 1, 1),
('A5', 'Material A5', 1200, 'UNIDADES', 11000, 1, 1);

INSERT INTO product_inventory (product_id, quantity, unit_cost, created_by, updated_by) VALUES 
(1, 320, 139500, 1, 1),
(2, 250, 132000, 1, 1),
(3, 180, 123000, 1, 1); 