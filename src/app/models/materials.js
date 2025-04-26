import { DataTypes } from "sequelize";
import { connectToDatabase } from '../../config/index.js';
import Units from "./units.js";

const Material = connectToDatabase().define("materials", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  base_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
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
  tableName: 'materials',
  timestamps: false
});

Material.belongsTo(Units, { foreignKey: 'unit_id' });

export default Material;
