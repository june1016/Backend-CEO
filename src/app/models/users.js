import { DataTypes } from 'sequelize';
import { conectionDataBase } from '../../config/index.js';

/* Defining a Sequelize model named `Users` that represents a table in a database */
const Users = conectionDataBase().define(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gmail: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),

      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true
  }
);

export default Users;
