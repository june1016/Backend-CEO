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
(4, 'Ratio', TRUE, 1, 1),
(5, 'Unidad', TRUE, 1, 1),
(6, 'Metro', TRUE, 1, 1),
(7, 'Metro cuadrado', TRUE, 1, 1),
(8, 'Metro cúbico', TRUE, 1, 1),
(9, 'Litro', TRUE, 1, 1),
(10, 'Galón', TRUE, 1, 1),
(11, 'Kilogramo', TRUE, 1, 1),
(12, 'Gramo', TRUE, 1, 1),
(13, 'Caja', TRUE, 1, 1),
(14, 'Paquete', TRUE, 1, 1);

INSERT INTO financial_categories (name) VALUES 
('Activos'), ('Pasivos'), ('Patrimonio'), ('Otros');

INSERT INTO financial_titles (name, category_id) VALUES 
('Dinero en caja', 1), 
('Dinero en banco', 1),
('Inventario', 1),
('Cuentas por cobrar', 1),
('Maquinaria y equipo', 1),
('Equipos de oficina', 1),
('Muebles y enseres', 1),
('Patentes', 1),
('Cuentas por pagar', 2),
('Letras por pagar', 2),
('Deuda a largo plazo', 2),
('Capital social', 3),
('Utilidades retenidas', 3),
('Costos operativos', 2);

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
(13, 3, 60000000.00, 'Savings', 1, 1),
(14 2, 70000000.00, 'CreditCard', 1, 1);

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

INSERT INTO personnel_expenses (name, quantity, value_cop, note, created_by, updated_by) VALUES 
 ('Nómina Gerente (CEO)', 1, 6000000, 'Obligatorio - El CEO asume rol administrativo', 1, 1),
 ('Nómina Vendedor', 1, 0, 'Mínimo requerido (1 × <salario>)', 1, 1),
 ('Nómina operarios', 3, 5400000, 'Mínimo requerido (3 × 1.800.000)', 1, 1);

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

INSERT INTO shifts (name, start_time, end_time, created_by, updated_by) VALUES 
('Mañana', '06:00', '14:00', 1, 1),
('Tarde', '14:00', '22:00', 1, 1),
('Noche', '22:00', '06:00', 1, 1);

INSERT INTO specifications (
  name, base_capacity, setup_time, production_time, maintenance_time,
  daily_standard_output, max_monthly_capacity, created_by, updated_by
) VALUES
('Especificación NRX31', 100, 20, 60, 10, 800, 24000, 1, 1),
('Especificación XLG77', 150, 30, 55, 15, 1000, 30000, 1, 1),
('Especificación CP23H', 120, 25, 50, 12, 900, 27000, 1, 1);

INSERT INTO machines (name, product_id, specification_id, created_by, updated_by)VALUES
('NRX31-001', 1, 1, 1, 1),
('XLG77-001', 2, 2, 1, 1),
('CP23H-001', 3, 3, 1, 1);

INSERT INTO payroll_configurations (name, created_by, updated_by) VALUES 
('Configuración Base', 1, 1);

-- Roles principales
INSERT INTO payroll_roles (id, name, base_salary, optional, created_by)
VALUES 
(1, 'Gerente (CEO)', 6000000, FALSE, 1),
(2, 'Operario', 1800000, FALSE, 1),
(3, 'Vendedor', 1500000, FALSE, 1);

-- Personal de apoyo (opcional)
INSERT INTO payroll_roles (id, name, base_salary, optional, created_by)
VALUES 
(4, 'Jefe de Producción', 2500000, TRUE, 1),
(5, 'Almacenista', 1800000, TRUE, 1),
(6, 'Contador', 2500000, TRUE, 1),
(7, 'Secretaria', 2200000, TRUE, 1);

-- CEO
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  1,
  'Gestión administrativa estratégica',
  'El CEO optimiza la gestión general y toma decisiones clave.',
  '{"efficiency_multiplier": 1.05, "administrative_control": true}',
  1
);

-- Operarios
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  2,
  'Mayor producción',
  'Aumenta el rendimiento de la producción mediante mejoras operativas.',
  '{"productivity_boost": 0.12, "error_reduction": 0.05}',
  1
);

-- Vendedor
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  3,
  'Estrategia de ventas básica',
  'Aumenta el flujo de clientes y aplica comisión sobre ventas.',
  '{"sales_boost": 0.10, "commission": 0.01}',
  1
);

-- Jefe de Producción
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  4,
  'Optimización de producción',
  'Optimiza distribución de producción, alerta sobre eficiencia y reduce errores.',
  '{"production_distribution": "optimized", "efficiency_alerts": true, "error_reduction": 0.15}',
  1
);

-- Almacenista
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  5,
  'Gestión de inventario',
  'Alertas automáticas de stock y reducción de desabastecimiento.',
  '{"stock_alerts": true, "order_optimization": true, "stockout_risk_reduction": 0.20}',
  1
);

-- Contador
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  6,
  'Contabilidad automatizada',
  'Estados financieros automáticos, alertas de pagos y reducción de errores contables.',
  '{"financial_statements": "automated", "payment_alerts": true, "accounting_error_reduction": 0.25}',
  1
);

-- Secretaria
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  7,
  'Gestión administrativa secundaria',
  'Organización de pagos y reducción de pagos tardíos.',
  '{"payment_organization": true, "due_date_alerts": true, "late_payment_reduction": 0.10}',
  1
);

-- Asociaciones con roles
INSERT INTO payroll_role_improvements (role_id, improvement_id)
VALUES
(1, 1), -- CEO
(2, 2), -- Operarios
(3, 3), -- Vendedor
(4, 4), -- Jefe de Producción
(5, 5), -- Almacenista
(6, 6), -- Contador
(7, 7); -- Secretaria


INSERT INTO machine_shift_assignments (configuration_id, machine_id, shift_id, operator_count, created_by, updated_by) VALUES
(1, 1, 1, 0, 1, 1),
(1, 1, 2, 0, 1, 1),
(1, 1, 3, 0, 1, 1);


INSERT INTO machine_shift_assignments (configuration_id, machine_id, shift_id, operator_count, created_by, updated_by) VALUES
(1, 2, 1, 0, 1, 1),
(1, 2, 2, 0, 1, 1),
(1, 2, 3, 0, 1, 1);


INSERT INTO machine_shift_assignments (configuration_id, machine_id, shift_id, operator_count, created_by, updated_by) VALUES
(1, 3, 1, 0, 1, 1),
(1, 3, 2, 0, 1, 1),
(1, 3, 3, 0, 1, 1);

INSERT INTO providers (id, name, logo_filename, description, location, delivery_time, volume_discount) VALUES 
  (1, 'Surtidor', 'El surtidor.png', 'Proveedor con entrega rápida y amplia variedad de materiales industriales.', 'Medellín, Colombia', 2, 3),
  (2, 'Top Almacén', 'Top almacen.png', 'Proveedor con precios competitivos y políticas de descuento atractivas.', 'Bogotá, Colombia', 4, 5),
  (3, 'Padilla', 'Padilla.png', 'Especialista en materiales específicos con excelente calidad de producto.', 'Cali, Colombia', 3, 4),
  (4, 'CostaMater', 'CostaMater.png', 'Proveedor industrial con fuertes descuentos por volumen y plazos extendidos.', 'Barranquilla, Colombia', 6, 8);

INSERT INTO provider_payment_options (provider_id, option) VALUES
(1, 'contado'), (1, '30 días'), (1, '60 días'),
(2, 'contado'), (2, '30 días'),
(3, 'contado'), (3, '30 días'), (3, '60 días'),
(4, 'contado'), (4, '30 días'), (4, '60 días');

INSERT INTO materials (id, code, name, description, unit_id, base_price) VALUES
  (1, 'A1', 'Material base', 'Material básico estructural', 11, 4000),
  (2, 'A2', 'Material de revestimiento', 'Revestimiento para todos los productos', 9, 6000),
  (3, 'A3', 'Material de refuerzo', 'Refuerzo estructural para productos', 11, 5000),
  (4, 'A4', 'Componente principal Alfaros', 'Material específico para Alfaros', 5, 4000),
  (5, 'A5', 'Componente secundario Alfaros', 'Material complementario para Alfaros', 5, 5000),
  (6, 'A6', 'Componente principal Betacos', 'Material específico para Betacos', 6, 6000),
  (7, 'A7', 'Componente secundario Betacos', 'Material complementario para Betacos', 5, 4000),
  (8, 'A8', 'Componente principal Gamaroles', 'Material básico para Gamaroles', 11, 10000),
  (9, 'A9', 'Componente secundario Gamaroles', 'Material complementario para Gamaroles', 5, 7000),
  (10, 'A10', 'Material de acabado', 'Acabado final para todos los productos', 9, 8000);


INSERT INTO materials_by_provider (provider_id, material_id, price, created_by, updated_by) VALUES
  (1, 1, 4200, 1, 1),
  (1, 2, 6300, 1, 1),
  (1, 3, 4950, 1, 1),
  (1, 4, 4100, 1, 1),
  (1, 5, 4950, 1, 1),
  (1, 6, 6150, 1, 1),
  (1, 7, 4250, 1, 1),
  (1, 8, 9800, 1, 1),
  (1, 9, 7200, 1, 1),
  (1, 10, 8400, 1, 1);

INSERT INTO materials_by_provider (provider_id, material_id, price, created_by, updated_by) VALUES
  (2, 1, 3800, 1, 1),
  (2, 2, 5850, 1, 1),
  (2, 3, 5250, 1, 1),
  (2, 4, 3900, 1, 1),
  (2, 5, 5200, 1, 1),
  (2, 6, 5700, 1, 1),
  (2, 7, 4150, 1, 1),
  (2, 8, 10500, 1, 1),
  (2, 9, 6800, 1, 1),
  (2, 10, 7600, 1, 1);

INSERT INTO materials_by_provider (provider_id, material_id, price, created_by, updated_by) VALUES
  (3, 1, 4100, 1, 1),
  (3, 2, 6200, 1, 1),
  (3, 3, 4700, 1, 1),
  (3, 4, 3800, 1, 1),
  (3, 5, 5300, 1, 1),
  (3, 6, 6400, 1, 1),
  (3, 7, 3850, 1, 1),
  (3, 8, 10200, 1, 1),
  (3, 9, 7500, 1, 1),
  (3, 10, 8300, 1, 1);

INSERT INTO materials_by_provider (provider_id, material_id, price, created_by, updated_by) VALUES
  (4, 1, 4050, 1, 1),
  (4, 2, 5950, 1, 1),
  (4, 3, 5100, 1, 1),
  (4, 4, 4200, 1, 1),
  (4, 5, 4750, 1, 1),
  (4, 6, 5800, 1, 1),
  (4, 7, 4150, 1, 1),
  (4, 8, 9600, 1, 1),
  (4, 9, 6900, 1, 1),
  (4, 10, 8100, 1, 1);