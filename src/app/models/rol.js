import { DataTypes } from 'sequelize';
import { conectionDataBase } from '../../config/index.js';

/* Defining a Sequelize model named `Project` that represents a table in a database */
const Rol = conectionDataBase().define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nameRol: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  tableName: 'rol',
  timestamps: true,
  underscored: true
});

export default Rol;
