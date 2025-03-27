import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import FinancialTitle from './FinancialTitle.js';
import Users from './users.js';
import Literals from './literals.js';

const FinancialData = connectToDatabase().define('FinancialData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FinancialTitle,
      key: 'id',
    },
    onDelete: 'CASCADE',
    unique: 'unique_title_user',
  },
  literal_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Literals,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },
  amount: {
    type: DataTypes.DECIMAL(50, 2),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
    unique: 'unique_title_user',
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'financial_data',
  underscored: true
});

// Definir relaciones
FinancialTitle.hasMany(FinancialData, { foreignKey: 'title_id', onDelete: 'CASCADE' });
FinancialData.belongsTo(FinancialTitle, { foreignKey: 'title_id' });

Literals.hasMany(FinancialData, { foreignKey: "literal_id", onDelete: "CASCADE" });
FinancialData.belongsTo(Literals, { foreignKey: "literal_id" });

Users.hasMany(FinancialData, { foreignKey: 'created_by' });
Users.hasMany(FinancialData, { foreignKey: 'updated_by' });
FinancialData.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
FinancialData.belongsTo(Users, { foreignKey: 'updated_by', as: 'updater' });

export default FinancialData;
