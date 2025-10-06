drop table if exists operation_progress CASCADE;

drop table if exists payroll_role_improvements CASCADE;

drop table if exists payroll_improvements_assignments CASCADE;

drop table if exists payroll_assignments CASCADE;

drop table if exists improvements CASCADE;

drop table if exists payroll_roles CASCADE;

drop table if exists payroll_configurations CASCADE;

drop table if exists machine_shift_assignments CASCADE;

drop table if exists shifts CASCADE;

drop table if exists machines CASCADE;

drop table if exists specifications CASCADE;

drop table if exists materials_by_provider CASCADE;

drop table if exists provider_payment_options CASCADE;

drop table if exists providers CASCADE;

drop table if exists materials CASCADE;

drop table if exists inventory_policy CASCADE;

drop table if exists monthly_operations CASCADE;

drop table if exists raw_materials_inventory CASCADE;

drop table if exists social_charges CASCADE;

drop table if exists financial_obligations CASCADE;

drop table if exists operating_costs CASCADE;

drop table if exists other_expenses CASCADE;

drop table if exists operating_expenses CASCADE;

drop table if exists personnel_expenses CASCADE;

drop table if exists costs CASCADE;

drop table if exists sales_costs CASCADE;

drop table if exists sales CASCADE;

drop table if exists projected_sales CASCADE;

drop table if exists product_inventory CASCADE;

drop table if exists products CASCADE;

drop table if exists sales_budget CASCADE;

drop table if exists annual_objective_indicators CASCADE;

drop table if exists indicator_titles CASCADE;

drop table if exists financial_data CASCADE;

drop table if exists financial_titles CASCADE;

drop table if exists financial_categories CASCADE;

drop table if exists literals CASCADE;

drop table if exists months CASCADE;

drop table if exists group_students CASCADE;

drop table if exists groups CASCADE;

drop table if exists universities CASCADE;

drop table if exists users_by_rol CASCADE;

drop table if exists rol CASCADE;

drop table if exists units CASCADE;

drop table if exists users CASCADE;

create table users (
  id SERIAL primary key,
  email VARCHAR(500) not null unique,
  password TEXT not null,
  name VARCHAR(500) not null,
  last_name VARCHAR(500) not null,
  token TEXT null,
  reset_password_token varchar(255) null,
  reset_password_expires timestamp null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table rol (
  id SERIAL primary key,
  name_rol VARCHAR(50) not null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table users_by_rol (
  id SERIAL primary key,
  user_id INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  rol_id INTEGER not null references rol (id) on delete CASCADE on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table universities (
  id SERIAL primary key,
  name VARCHAR(150) not null,
  city VARCHAR(100) not null,
  country VARCHAR(100) not null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table groups (
  id SERIAL primary key,
  name VARCHAR(100) not null,
  description TEXT,
  teacher_id INTEGER not null references users (id) on delete CASCADE,
  university_id INTEGER references universities (id) on delete set null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table group_students (
  id SERIAL primary key,
  group_id INTEGER not null references groups (id) on delete CASCADE,
  student_id INTEGER not null references users (id) on delete CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table literals (
  id SERIAL primary key,
  name VARCHAR(255) not null,
  active BOOLEAN not null default true,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table units (
  id INT primary key,
  name VARCHAR(255) not null,
  active BOOLEAN default true,
  created_by INT not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INT null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table financial_categories (
  id SERIAL primary key,
  name VARCHAR(255) not null unique
);

create table financial_titles (
  id SERIAL primary key,
  name VARCHAR(255) not null unique,
  category_id INTEGER not null references financial_categories (id) on delete CASCADE
);

create table financial_data (
  id SERIAL primary key,
  title_id INTEGER not null references financial_titles (id) on delete CASCADE,
  literal_id INTEGER not null references literals (id) on delete CASCADE,
  amount DECIMAL(50, 2) not null,
  icon VARCHAR(255) null,
  created_by INTEGER not null references users (id) on delete CASCADE,
  updated_by INTEGER null references users (id) on delete set null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

alter table financial_data
add constraint unique_title_user_financial_data unique (title_id, created_by);

create table indicator_titles (
  id SERIAL primary key,
  name VARCHAR(255) not null unique
);

create table annual_objective_indicators (
  id SERIAL primary key,
  title_id INTEGER not null references indicator_titles (id) on update CASCADE on delete RESTRICT,
  literal_id INTEGER not null references literals (id) on update CASCADE on delete RESTRICT,
  unit_id INTEGER not null references units (id) on update CASCADE on delete RESTRICT,
  value DECIMAL(50, 2) not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

alter table annual_objective_indicators
add constraint unique_title_user_annual_objective_indicators unique (title_id, created_by);

create table months (
  id SERIAL primary key,
  name VARCHAR(255) not null unique,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table sales_budget (
  id SERIAL primary key,
  month_id INTEGER not null references months (id) on delete CASCADE on update CASCADE,
  growth DECIMAL(5, 2) not null,
  decade_1 DECIMAL(50, 2) not null,
  decade_2 DECIMAL(50, 2) not null,
  decade_3 DECIMAL(50, 2) not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table products (
  id SERIAL primary key,
  name VARCHAR(255) not null unique,
  quantity INTEGER not null, -- ← CAMPO FALTANTE
  unit_cost BIGINT not null, -- ← CAMPO FALTANTE  
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table sales (
  id SERIAL primary key,
  product_id INTEGER not null references products (id) on delete CASCADE on update CASCADE,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table sales_costs (
  id SERIAL primary key,
  product_id INTEGER not null references products (id) on delete CASCADE on update CASCADE,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table projected_sales (
  id SERIAL primary key,
  product_id INTEGER not null references products (id) on delete CASCADE on update CASCADE,
  quantity INTEGER not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table costs (
  id SERIAL primary key,
  labor_cost INTEGER not null,
  raw_material_cost INTEGER not null,
  indirect_costs INTEGER not null,
  total DECIMAL(100, 2) not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table operating_expenses (
  id SERIAL primary key,
  type VARCHAR(255) not null,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table personnel_expenses (
  id SERIAL primary key,
  name VARCHAR(255) not null,
  quantity INTEGER not null,
  value_cop BIGINT not null,
  note TEXT,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table other_expenses (
  id SERIAL primary key,
  concept VARCHAR(255) not null,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table operating_costs (
  id SERIAL primary key,
  name VARCHAR(255) not null,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table financial_obligations (
  id SERIAL primary key,
  name VARCHAR(255) not null,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table social_charges (
  id SERIAL primary key,
  name VARCHAR(255) not null,
  value_cop BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table clients (
  id SERIAL primary key,
  name TEXT not null,
  note TEXT,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table monthly_operations (
  id SERIAL primary key,
  user_id INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  product_id INTEGER not null references products (id) on delete CASCADE on update CASCADE,
  month_id INTEGER not null references months (id) on delete CASCADE on update CASCADE,
  client_id INTEGER not null references clients (id) on delete CASCADE on update CASCADE,
  decade INTEGER not null check (decade between 1 and 3),
  quantity INTEGER not null,
  unit_cost DECIMAL(20, 2) not null,
  total_cost DECIMAL(20, 2) not null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table raw_materials_inventory (
  id SERIAL primary key,
  code VARCHAR(10) not null,
  description VARCHAR(255) not null,
  quantity INTEGER not null,
  unit VARCHAR(50) not null,
  unit_cost BIGINT not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table product_inventory (
  id SERIAL primary key,
  product_id INTEGER not null references products (id) on delete CASCADE on update CASCADE,
  quantity INTEGER not null,
  unit_cost BIGINT not null,
  credit30 INTEGER default 0,
  credit60 INTEGER default 0,
  investment_percent INTEGER default 0,
  base_probability REAL not null default 0.05,
  note TEXT,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table inventory_policy (
  id SERIAL primary key,
  month_id INTEGER not null references months (id) on delete CASCADE on update CASCADE,
  value INTEGER not null check (
    value >= 0
    and value <= 30
  ),
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP,
  unique (month_id, created_by)
);

create table providers (
  id SERIAL primary key,
  name VARCHAR(100) not null,
  logo_filename VARCHAR(100),
  description TEXT,
  location VARCHAR(100),
  delivery_time INTEGER,
  volume_discount DECIMAL(5, 2),
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table provider_payment_options (
  id SERIAL primary key,
  provider_id INTEGER references providers (id) on delete CASCADE,
  option VARCHAR(50),
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table materials (
  id SERIAL primary key,
  code VARCHAR(20) not null,
  name VARCHAR(100) not null,
  description TEXT,
  unit_id INTEGER references units (id),
  base_price DECIMAL(10, 2) not null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table materials_by_provider (
  id SERIAL primary key,
  provider_id INTEGER references providers (id) on delete CASCADE,
  material_id INTEGER references materials (id) on delete CASCADE,
  price DECIMAL(10, 2) not null,
  payment_option VARCHAR(50),
  created_by INTEGER references users (id),
  updated_by INTEGER references users (id),
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

alter table materials_by_provider
add constraint unique_material_updated_by unique (material_id, updated_by);

create table specifications (
  id SERIAL primary key,
  name VARCHAR(255) not null unique,
  base_capacity INTEGER not null,
  setup_time INTEGER not null,
  production_time INTEGER not null,
  maintenance_time INTEGER not null,
  daily_standard_output INTEGER not null,
  max_monthly_capacity INTEGER not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table machines (
  id SERIAL primary key,
  name VARCHAR(255) not null,
  specification_id INTEGER not null references specifications (id) on delete CASCADE on update CASCADE,
  product_id INTEGER not null references products (id) on delete CASCADE on update CASCADE,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER null references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table payroll_roles (
  id SERIAL primary key,
  name VARCHAR(100) not null unique,
  base_salary INTEGER not null,
  optional BOOLEAN default false,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table payroll_configurations (
  id SERIAL primary key,
  name VARCHAR(100),
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table improvements (
  id SERIAL primary key,
  title VARCHAR(100) not null,
  description TEXT not null,
  effect JSONB not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table payroll_role_improvements (
  id SERIAL primary key,
  role_id INTEGER not null references payroll_roles (id) on delete CASCADE on update CASCADE,
  improvement_id INTEGER not null references improvements (id) on delete CASCADE on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table payroll_improvements_assignments (
  id SERIAL primary key,
  role_improvement_id INTEGER not null references payroll_role_improvements (id) on delete CASCADE on update CASCADE,
  configuration_id INTEGER not null references payroll_configurations (id) on delete CASCADE on update CASCADE,
  quantity INTEGER not null default 0,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

alter table payroll_improvements_assignments
add constraint payroll_assignments_unique unique (role_improvement_id, created_by);

create table shifts (
  id SERIAL primary key,
  name VARCHAR(50) not null unique,
  start_time TIME not null,
  end_time TIME not null,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table machine_shift_assignments (
  id SERIAL primary key,
  configuration_id INTEGER not null references payroll_configurations (id) on delete CASCADE on update CASCADE,
  machine_id INTEGER not null references machines (id) on delete CASCADE on update CASCADE,
  shift_id INTEGER not null references shifts (id) on delete CASCADE on update CASCADE,
  operator_count INTEGER not null default 0,
  created_by INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  updated_by INTEGER references users (id) on delete set null on update CASCADE,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP
);

alter table machine_shift_assignments
add constraint unique_machine_shift_assignment unique (machine_id, shift_id, created_by);

create table operation_progress (
  id SERIAL primary key,
  user_id INTEGER not null references users (id) on delete CASCADE on update CASCADE,
  month_id INTEGER not null references months (id) on delete CASCADE on update CASCADE,
  current_decade INTEGER not null check (
    current_decade >= 1
    and current_decade <= 3
  ),
  is_december BOOLEAN default false,
  start_time TIMESTAMP,
  created_at TIMESTAMP default NOW(),
  updated_at TIMESTAMP default NOW(),
  constraint unique_user_id unique (user_id)
);

create table marketing_configurations (
  id SERIAL primary key,
  user_id INTEGER not null references users (id) on delete CASCADE,
  percent INTEGER not null,
  cost BIGINT not null,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP default CURRENT_TIMESTAMP,
  constraint unique_configuration_marketing_user_id unique (user_id)
);