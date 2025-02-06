import { DataTypes } from 'sequelize';
import { connectionDatabase } from '../../config/index.js';
import Literals from './literals.js';

/* Defining a Sequelize model named `BeginningBalanceSheet` */
const BeginningBalanceSheet = connectionDatabase().define('BeginningBalanceSheet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  account: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
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
  tableName: 'beginning_balance_sheet',
  timestamps: true,
  underscored: true
});

BeginningBalanceSheet.belongsTo(Literals, { foreignKey: 'literal_id', as: 'literal' });
Literals.hasMany(BeginningBalanceSheet, { foreignKey: 'literal_id', as: 'balance_sheets' });

export default BeginningBalanceSheet;
