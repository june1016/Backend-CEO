import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';


const Month = connectToDatabase().define('Month', {
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
  tableName: 'months',
  timestamps: false,
});

Users.hasMany(Month, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasMany(Month, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Month.belongsTo(Users, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Month.belongsTo(Users, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

export default Month;
