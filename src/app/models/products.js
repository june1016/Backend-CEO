import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';

const Products = connectToDatabase().define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_cost: {
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
  tableName: 'products',
  timestamps: false,
});

Users.hasMany(Products, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasMany(Products, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Products.belongsTo(Users, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Products.belongsTo(Users, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

export default Products;
