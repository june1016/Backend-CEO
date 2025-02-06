import { DataTypes } from 'sequelize';
import { connectionDatabase } from '../../config/index.js';

/* Defining a Sequelize model named `SalesBudget` */
const SalesBudget = connectionDatabase().define('SalesBudget', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  month: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  growth: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false
  },
  decade_1: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  decade_2: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  decade_3: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  tableName: 'sales_budget',
  timestamps: true,
  underscored: true
});

export default SalesBudget;
