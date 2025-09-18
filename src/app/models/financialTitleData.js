// Backend-CEO/src/app/models/financialTitleData.js
import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import FinancialCategory from './financialCategoryData.js';
import Literals from './literals.js'; // ✅ Importar Literals

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
  icon: {
    type: DataTypes.STRING,
    allowNull: true, // Permitir null si no siempre se usa
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
  literal_id: { // ✅ Nuevo campo
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Literals,
      key: 'id',
    },
    onDelete: 'SET NULL',
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

// Relaciones
FinancialCategory.hasMany(FinancialTitle, { foreignKey: 'category_id', onDelete: 'CASCADE' });
FinancialTitle.belongsTo(FinancialCategory, { foreignKey: 'category_id' });

Literals.hasMany(FinancialTitle, { foreignKey: 'literal_id', onDelete: 'SET NULL' }); // ✅ Relación
FinancialTitle.belongsTo(Literals, { foreignKey: 'literal_id' });

export default FinancialTitle;