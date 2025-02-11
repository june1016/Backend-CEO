import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import Rol from './rol.js';

/* Defining a Sequelize model named `UserByProject` that represents a table in a database */
const UserByRol = connectToDatabase().define(
  'UserByRol',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'id'
      }
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rol,
        key: 'id'
      }
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
    tableName: 'users_by_rol',
    timestamps: true,
    underscored: true
  }
);

Users.hasMany(UserByRol, { foreignKey: 'user_id' });
UserByRol.belongsTo(Users, { foreignKey: 'user_id' });

Rol.hasMany(UserByRol, { foreignKey: 'rol_id' });
UserByRol.belongsTo(Rol, { foreignKey: 'rol_id' });

export default UserByRol;
