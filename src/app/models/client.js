import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';

const Clients = connectToDatabase().define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Indica si es Empresa, Cliente Mayorista o Cliente Natural',
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
  tableName: 'clients',
  timestamps: true,
  underscored: true,
});

export default Clients;
