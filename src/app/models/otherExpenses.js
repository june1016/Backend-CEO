import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';

const OtherExpense = connectToDatabase().define('OtherExpense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  concept: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value_cop: {
    type: DataTypes.BIGINT,
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
    onUpdate: 'CASCADE',
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
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
  tableName: 'other_expenses',
  timestamps: false,
});

Users.hasMany(OtherExpense, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasMany(OtherExpense, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

OtherExpense.belongsTo(Users, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OtherExpense.belongsTo(Users, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

export default OtherExpense;
