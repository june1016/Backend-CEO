import { DataTypes } from "sequelize";
import { connectToDatabase } from '../../config/index.js';
import Material from "./materials.js";
import Users from "./users.js";

const MaterialsByProvider = connectToDatabase().define("materials_by_provider", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  material_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  payment_option: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'materials_by_provider',
  timestamps: false
});


MaterialsByProvider.belongsTo(Material, { foreignKey: 'material_id' });

MaterialsByProvider.belongsTo(Users, { foreignKey: 'created_by' });
MaterialsByProvider.belongsTo(Users, { foreignKey: 'updated_by' });

export default MaterialsByProvider;
