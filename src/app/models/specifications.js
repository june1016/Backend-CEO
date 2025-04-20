// models/Specification.js
import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';

const Specification = connectToDatabase().define('Specification', {
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
  base_capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  setup_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  production_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maintenance_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  daily_standard_output: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_monthly_capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
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
  tableName: 'specifications',
  timestamps: false,
});

export default Specification;
