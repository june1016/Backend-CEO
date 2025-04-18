import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Products from './products.js';
import Users from './users.js';

const ProjectedSales = connectToDatabase().define('ProjectedSales', {
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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'projected_sales',
  underscored: true,
});

// Relaciones
Products.hasMany(ProjectedSales, { foreignKey: 'product_id' });
ProjectedSales.belongsTo(Products, { foreignKey: 'product_id' });

Users.hasMany(ProjectedSales, { foreignKey: 'created_by' });
Users.hasMany(ProjectedSales, { foreignKey: 'updated_by' });
ProjectedSales.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
ProjectedSales.belongsTo(Users, { foreignKey: 'updated_by', as: 'updater' });

export default ProjectedSales;
