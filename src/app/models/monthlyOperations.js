import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import Products from './products.js';
import Months from './months.js';
import Clients from './client.js';

const MonthlyOperation = connectToDatabase().define('MonthlyOperation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },

  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },

  month_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Months,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Clients,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  decade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    },
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  unit_cost: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
  },

  total_cost: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },

  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
}, {
  tableName: 'monthly_operations',
  timestamps: true,
  underscored: true
});

Users.hasMany(MonthlyOperation, { foreignKey: 'user_id' });
MonthlyOperation.belongsTo(Users, { foreignKey: 'user_id' });

Products.hasMany(MonthlyOperation, { foreignKey: 'product_id' });
MonthlyOperation.belongsTo(Products, { foreignKey: 'product_id' });

Months.hasMany(MonthlyOperation, { foreignKey: 'month_id' });
MonthlyOperation.belongsTo(Months, { foreignKey: 'month_id' });

Clients.hasMany(MonthlyOperation, { foreignKey: 'client_id' });
MonthlyOperation.belongsTo(Clients, { foreignKey: 'client_id' });

export default MonthlyOperation;
