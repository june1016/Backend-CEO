import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';

const PersonnelExpense = connectToDatabase().define('PersonnelExpense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value_cop: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  tableName: 'personnel_expenses',
  timestamps: false,
});

Users.hasMany(PersonnelExpense, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasMany(PersonnelExpense, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

PersonnelExpense.belongsTo(Users, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PersonnelExpense.belongsTo(Users, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

export default PersonnelExpense;
