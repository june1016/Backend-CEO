import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import Products from './products.js';

const Sale = connectToDatabase().define('Sale', {
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
  tableName: 'sales',
  timestamps: false,
});

Products.hasMany(Sale, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Sale.belongsTo(Products, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Users.hasMany(Sale, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Users.hasMany(Sale, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Sale.belongsTo(Users, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Sale.belongsTo(Users, { foreignKey: 'updated_by', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

export default Sale;
