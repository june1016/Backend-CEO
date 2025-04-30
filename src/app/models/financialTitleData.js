import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import FinancialCategory from './financialCategoryData.js';

const FinancialTitle = connectToDatabase().define('FinancialTitle', {
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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FinancialCategory,
      key: 'id',
    },
    onDelete: 'CASCADE',
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
  tableName: 'financial_titles',
  timestamps: false,
});

FinancialCategory.hasMany(FinancialTitle, { foreignKey: 'category_id', onDelete: 'CASCADE' });
FinancialTitle.belongsTo(FinancialCategory, { foreignKey: 'category_id' });

export default FinancialTitle;
