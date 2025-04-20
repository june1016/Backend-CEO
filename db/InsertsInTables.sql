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

-- Vendedor
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  2,
  'Estrategia de ventas básica',
  'Aumenta el flujo de clientes y aplica comisión sobre ventas.',
  '{"sales_boost": 0.10, "commission": 0.01}',
  1
);

-- Jefe de Producción
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  3,
  'Optimización de producción',
  'Optimiza distribución de producción, alerta sobre eficiencia y reduce errores.',
  '{"production_distribution": "optimized", "efficiency_alerts": true, "error_reduction": 0.15}',
  1
);

-- Almacenista
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  4,
  'Gestión de inventario',
  'Alertas automáticas de stock y reducción de desabastecimiento.',
  '{"stock_alerts": true, "order_optimization": true, "stockout_risk_reduction": 0.20}',
  1
);

-- Contador
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  5,
  'Contabilidad automatizada',
  'Estados financieros automáticos, alertas de pagos y reducción de errores contables.',
  '{"financial_statements": "automated", "payment_alerts": true, "accounting_error_reduction": 0.25}',
  1
);

-- Secretaria
INSERT INTO improvements (id, title, description, effect, created_by)
VALUES (
  6,
  'Gestión administrativa secundaria',
  'Organización de pagos y reducción de pagos tardíos.',
  '{"payment_organization": true, "due_date_alerts": true, "late_payment_reduction": 0.10}',
  1
);

INSERT INTO payroll_role_improvements (role_id, improvement_id)
VALUES
(1, 1), -- CEO
(2, 2), -- Operarios
(3, 2), -- Vendedor
(4, 3), -- Jefe de Producción
(5, 4), -- Almacenista
(6, 5), -- Contador
(7, 6); -- Secretaria


-- NRX31-001
INSERT INTO machine_shift_assignments (configuration_id, machine_id, shift_id, operator_count, created_by, updated_by) VALUES
(1, 1, 1, 0, 1, 1),
(1, 1, 2, 0, 1, 1),
(1, 1, 3, 0, 1, 1);

-- XLG77-00
INSERT INTO machine_shift_assignments (configuration_id, machine_id, shift_id, operator_count, created_by, updated_by) VALUES
(1, 2, 1, 0, 1, 1),
(1, 2, 2, 0, 1, 1),
(1, 2, 3, 0, 1, 1);

-- CP23H-001
INSERT INTO machine_shift_assignments (configuration_id, machine_id, shift_id, operator_count, created_by, updated_by) VALUES
(1, 3, 1, 0, 1, 1),
(1, 3, 2, 0, 1, 1),
(1, 3, 3, 0, 1, 1);

INSERT INTO commercial_conditions (name, created_by, updated_by) VALUES
('Por compras mayores a 1000 flete gratis', 1, 1),
('Por compras mayores a 5000 descuento del 10%', 1, 1),
('Pago en efectivo tiene 5% de descuento', 1, 1),
('Entregas en 24 horas para compras mayores a 2000', 1, 1),
('Descuento del 15% por compras mensuales recurrentes', 1, 1),
('Flete compartido para compras menores a 800', 1, 1),
('Condición especial para clientes frecuentes', 1, 1),
('Entrega sin costo en radio urbano', 1, 1);

INSERT INTO providers (name, commercial_conditions_id, created_by, updated_by) VALUES
('El surtidor', 1, 1, 1),
('Top almacen', 2, 1, 1),
('Pandilla', 3, 1, 1),
('Pandilla', 4, 1, 1);

INSERT INTO catalogs (name, value, unit_id, provider_id, created_by, updated_by) VALUES
('A1', 15000.00, 3, 1, 1, 1),
('A2', 3200.50, 5, 1, 1, 1),
('A3', 210.75, 11, 1, 1, 1),
('A4', 18000.00, 6, 1, 1, 1),
('A5', 890.90, 7, 1, 1, 1),
('A6', 13400.00, 9, 1, 1, 1),
('A7', 700.25, 10, 1, 1, 1),
('A8', 152000.00, 12, 1, 1, 1);

INSERT INTO catalogs (name, value, unit_id, provider_id, created_by, updated_by) VALUES
('A1', 12500.00, 3, 2, 1, 1),
('A2', 4500.25, 5, 2, 1, 1),
('A3', 330.00, 11, 2, 1, 1),
('A4', 19800.00, 6, 2, 1, 1),
('A5', 910.10, 7, 2, 1, 1),
('A6', 14400.00, 9, 2, 1, 1),
('A7', 755.75, 10, 2, 1, 1),
('A8', 162500.00, 12, 2, 1, 1);

INSERT INTO catalogs (name, value, unit_id, provider_id, created_by, updated_by) VALUES
('A1', 13200.00, 3, 3, 1, 1),
('A2', 3800.00, 5, 3, 1, 1),
('A3', 290.45, 11, 3, 1, 1),
('A4', 17200.00, 6, 3, 1, 1),
('A5', 875.00, 7, 3, 1, 1),
('A6', 12200.00, 9, 3, 1, 1),
('A7', 810.99, 10, 3, 1, 1),
('A8', 147500.00, 12, 3, 1, 1);
