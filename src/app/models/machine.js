import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Specification from './specifications.js';
import Product from './products.js';

const Machine = connectToDatabase().define('Machine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specification_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Specification,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
  tableName: 'machines',
  timestamps: false,
});

Specification.hasOne(Machine, { foreignKey: 'specification_id' });
Machine.belongsTo(Specification, { foreignKey: 'specification_id' });

Product.hasMany(Machine, { foreignKey: 'product_id' });
Machine.belongsTo(Product, { foreignKey: 'product_id' });

export default Machine;
