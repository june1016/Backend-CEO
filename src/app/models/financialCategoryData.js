import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';

const FinancialCategory = connectToDatabase().define('FinancialCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  tableName: 'financial_categories',
  timestamps: true,
  underscored: true
});

export default FinancialCategory;