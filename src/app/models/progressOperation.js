import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import Month from './months.js';

const OperationProgress = connectToDatabase().define('OperationProgress', {
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
    unique: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  month_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Month,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  current_decade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    },
  },
  is_december: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: true,
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
  tableName: 'operation_progress',
  timestamps: false,
  underscored: true
});

Users.hasMany(OperationProgress, { 
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Month.hasMany(OperationProgress, { 
  foreignKey: 'month_id',
  onDelete: 'CASCADE'
});
OperationProgress.belongsTo(Users, { 
  foreignKey: 'user_id'
});
OperationProgress.belongsTo(Month, { 
  foreignKey: 'month_id'
});

export default OperationProgress;