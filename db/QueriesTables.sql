
DROP TABLE IF EXISTS operation_progress CASCADE;
DROP TABLE IF EXISTS payroll_role_improvements CASCADE;
DROP TABLE IF EXISTS payroll_improvements_assignments CASCADE;
DROP TABLE IF EXISTS payroll_assignments CASCADE;
DROP TABLE IF EXISTS improvements CASCADE;
DROP TABLE IF EXISTS payroll_roles CASCADE;
DROP TABLE IF EXISTS payroll_configurations CASCADE;
DROP TABLE IF EXISTS machine_shift_assignments CASCADE;
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS machines CASCADE;
DROP TABLE IF EXISTS specifications CASCADE;
DROP TABLE IF EXISTS materials_by_provider CASCADE;
DROP TABLE IF EXISTS provider_payment_options CASCADE;
DROP TABLE IF EXISTS providers CASCADE;
DROP TABLE IF EXISTS materials CASCADE;
DROP TABLE IF EXISTS inventory_policy CASCADE;
DROP TABLE IF EXISTS monthly_operations CASCADE;
DROP TABLE IF EXISTS raw_materials_inventory CASCADE;
DROP TABLE IF EXISTS social_charges CASCADE;
DROP TABLE IF EXISTS financial_obligations CASCADE;
DROP TABLE IF EXISTS operating_costs CASCADE;
DROP TABLE IF EXISTS other_expenses CASCADE;
DROP TABLE IF EXISTS operating_expenses CASCADE;
DROP TABLE IF EXISTS personnel_expenses CASCADE;
DROP TABLE IF EXISTS costs CASCADE;
DROP TABLE IF EXISTS sales_costs CASCADE;
DROP TABLE IF EXISTS sales CASCADE;
DROP TABLE IF EXISTS projected_sales CASCADE;
DROP TABLE IF EXISTS product_inventory CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS sales_budget CASCADE;
DROP TABLE IF EXISTS annual_objective_indicators CASCADE;
DROP TABLE IF EXISTS indicator_titles CASCADE;
DROP TABLE IF EXISTS financial_data CASCADE;
DROP TABLE IF EXISTS financial_titles CASCADE;
DROP TABLE IF EXISTS financial_categories CASCADE;
DROP TABLE IF EXISTS literals CASCADE;
DROP TABLE IF EXISTS months CASCADE;
DROP TABLE IF EXISTS group_students CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS users_by_rol CASCADE;
DROP TABLE IF EXISTS rol CASCADE;
DROP TABLE IF EXISTS units CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(500) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name VARCHAR(500) NOT NULL,
  last_name VARCHAR(500) NOT NULL,
  token TEXT NULL,
  reset_password_token varchar(255) NULL,
	reset_password_expires timestamp NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rol (
  id SERIAL PRIMARY KEY,
  name_rol VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_by_rol (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  rol_id INTEGER NOT NULL REFERENCES rol(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE universities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  university_id INTEGER REFERENCES universities(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_students (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE literals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE units (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INT NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE financial_titles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER NOT NULL REFERENCES financial_categories(id) ON DELETE CASCADE
);

CREATE TABLE financial_data (
    id SERIAL PRIMARY KEY,
    title_id INTEGER NOT NULL REFERENCES financial_titles(id) ON DELETE CASCADE,
    literal_id INTEGER NOT NULL REFERENCES literals(id) ON DELETE CASCADE,
    amount DECIMAL(50,2) NOT NULL,
    icon VARCHAR(255) NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE financial_data ADD CONSTRAINT unique_title_user_financial_data UNIQUE (title_id, created_by);

CREATE TABLE indicator_titles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE annual_objective_indicators (
    id SERIAL PRIMARY KEY,
    title_id INTEGER NOT NULL REFERENCES indicator_titles(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    literal_id INTEGER NOT NULL REFERENCES literals(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    unit_id INTEGER NOT NULL REFERENCES units(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    value DECIMAL(50,2) NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE annual_objective_indicators ADD CONSTRAINT unique_title_user_annual_objective_indicators UNIQUE (title_id, created_by);

CREATE TABLE months (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales_budget (
    id SERIAL PRIMARY KEY,
    month_id INTEGER NOT NULL REFERENCES months(id) ON DELETE CASCADE ON UPDATE CASCADE,
    growth DECIMAL(5,2) NOT NULL,
    decade_1 DECIMAL(50,2) NOT NULL,
    decade_2 DECIMAL(50,2) NOT NULL,
    decade_3 DECIMAL(50,2) NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales_costs (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projected_sales (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
  quantity INTEGER NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE costs (
    id SERIAL PRIMARY KEY,
    labor_cost INTEGER NOT NULL,
    raw_material_cost INTEGER NOT NULL,
    indirect_costs INTEGER NOT NULL,
    total DECIMAL(100,2) NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE operating_expenses (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personnel_expenses (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     quantity INTEGER NOT NULL,
     value_cop BIGINT NOT NULL,
     note TEXT,
     created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE other_expenses (
    id SERIAL PRIMARY KEY,
    concept VARCHAR(255) NOT NULL,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE operating_costs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_obligations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_charges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value_cop BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE monthly_operations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    month_id INTEGER NOT NULL REFERENCES months(id) ON DELETE CASCADE ON UPDATE CASCADE,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE ON UPDATE CASCADE,
    decade INTEGER NOT NULL CHECK (decade BETWEEN 1 AND 3),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(20,2) NOT NULL,
    total_cost DECIMAL(20,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE raw_materials_inventory (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit VARCHAR(50) NOT NULL,
    unit_cost BIGINT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INTEGER NOT NULL,
    unit_cost BIGINT NOT NULL,
    credit30 INTEGER DEFAULT 0,
    credit60 INTEGER DEFAULT 0,
    investment_percent INTEGER DEFAULT 0,
    base_probability REAL NOT NULL DEFAULT 0.05,
    note TEXT,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_policy (
    id SERIAL PRIMARY KEY,
    month_id INTEGER NOT NULL REFERENCES months(id) ON DELETE CASCADE ON UPDATE CASCADE,
    value INTEGER NOT NULL CHECK (value >= 0 AND value <= 30),
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (month_id, created_by)
);

CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_filename VARCHAR(100),
  description TEXT,
  location VARCHAR(100),
  delivery_time INTEGER,
  volume_discount DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE provider_payment_options (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  option VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  unit_id INTEGER REFERENCES units(id),
  base_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials_by_provider (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
  material_id INTEGER REFERENCES materials(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  payment_option VARCHAR(50),
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE materials_by_provider
ADD CONSTRAINT unique_material_updated_by UNIQUE (material_id, updated_by);

CREATE TABLE specifications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  base_capacity INTEGER NOT NULL,
  setup_time INTEGER NOT NULL,
  production_time INTEGER NOT NULL,
  maintenance_time INTEGER NOT NULL,
  daily_standard_output INTEGER NOT NULL,
  max_monthly_capacity INTEGER NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE machines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specification_id INTEGER NOT NULL REFERENCES specifications(id) ON DELETE CASCADE ON UPDATE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  base_salary INTEGER NOT NULL,
  optional BOOLEAN DEFAULT FALSE,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_configurations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE improvements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  effect JSONB NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_role_improvements (
  id SERIAL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES payroll_roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
  improvement_id INTEGER NOT NULL REFERENCES improvements(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_improvements_assignments (
  id SERIAL PRIMARY KEY,
  role_improvement_id INTEGER NOT NULL REFERENCES payroll_role_improvements(id) ON DELETE CASCADE ON UPDATE CASCADE,
  configuration_id INTEGER NOT NULL REFERENCES payroll_configurations(id) ON DELETE CASCADE ON UPDATE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE payroll_improvements_assignments 
ADD CONSTRAINT payroll_assignments_unique UNIQUE (role_improvement_id, created_by);

CREATE TABLE shifts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE machine_shift_assignments (
  id SERIAL PRIMARY KEY,
  configuration_id INTEGER NOT NULL REFERENCES payroll_configurations(id) ON DELETE CASCADE ON UPDATE CASCADE,
  machine_id INTEGER NOT NULL REFERENCES machines(id) ON DELETE CASCADE ON UPDATE CASCADE,
  shift_id INTEGER NOT NULL REFERENCES shifts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  operator_count INTEGER NOT NULL DEFAULT 0,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE machine_shift_assignments
ADD CONSTRAINT unique_machine_shift_assignment UNIQUE (machine_id, shift_id, created_by);

CREATE TABLE operation_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  month_id INTEGER NOT NULL REFERENCES months(id) ON DELETE CASCADE ON UPDATE CASCADE,
  current_decade INTEGER NOT NULL CHECK (current_decade >= 1 AND current_decade <= 3),
  is_december BOOLEAN DEFAULT FALSE,
  start_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT unique_user_id UNIQUE (user_id)
);

CREATE TABLE marketing_configurations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    percent INTEGER NOT NULL,
    cost BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    CONSTRAINT unique_configuration_marketing_user_id UNIQUE (user_id)
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  note TEXT
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);