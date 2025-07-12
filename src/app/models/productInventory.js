import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import Products from './products.js';

const ProductInventory = connectToDatabase().define('ProductInventory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_cost: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  credit30: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  credit60: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  investment_percent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  base_probability: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.05,
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
  tableName: 'product_inventory',
  timestamps: false,
});

// Relaciones
Users.hasMany(ProductInventory, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasMany(ProductInventory, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

ProductInventory.belongsTo(Users, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductInventory.belongsTo(Users, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Products.hasMany(ProductInventory, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductInventory.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default ProductInventory;
