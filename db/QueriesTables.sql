DROP TABLE IF EXISTS monthly_operations;
DROP TABLE IF EXISTS annual_objective_indicators;
DROP TABLE IF EXISTS indicator_titles;
DROP TABLE IF EXISTS sales_budget;
DROP TABLE IF EXISTS financial_data;
DROP TABLE IF EXISTS financial_titles;
DROP TABLE IF EXISTS financial_categories;
DROP TABLE IF EXISTS literals;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS users_by_rol;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS users;

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

ALTER TABLE financial_data ADD CONSTRAINT unique_title_user UNIQUE (title_id, created_by);

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
    name VARCHAR(255) NOT NULL UNIQUE
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE monthly_operations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    indicator_id INTEGER NOT NULL REFERENCES annual_objective_indicators(id) ON DELETE CASCADE ON UPDATE CASCADE,
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    decade_1 DECIMAL(50,2) NOT NULL,
    decade_2 DECIMAL(50,2) NOT NULL,
    decade_3 DECIMAL(50,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
