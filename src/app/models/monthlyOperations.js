import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import AnnualObjectiveIndicator from './annual_objective_indicators.js';

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
  indicator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AnnualObjectiveIndicator,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12,
    },
  },
  decade_1: {
    type: DataTypes.DECIMAL(50, 2),
    allowNull: false,
  },
  decade_2: {
    type: DataTypes.DECIMAL(50, 2),
    allowNull: false,
  },
  decade_3: {
    type: DataTypes.DECIMAL(50, 2),
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
  timestamps: false,
});

Users.hasMany(MonthlyOperation, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
MonthlyOperation.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

AnnualObjectiveIndicator.hasMany(MonthlyOperation, { foreignKey: 'indicator_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
MonthlyOperation.belongsTo(AnnualObjectiveIndicator, { foreignKey: 'indicator_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default MonthlyOperation;
