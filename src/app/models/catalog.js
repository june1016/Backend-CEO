import { DataTypes } from "sequelize";
import { connectToDatabase } from "../../config/index.js";
import Provider from "./provider.js";
import Units from "./Units.js";

const Catalog = connectToDatabase().define("catalogs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Units,
      key: "id"
    }
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Provider,
      key: "id"
    }
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
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
  tableName: 'catalogs',
  timestamps: false
});

Catalog.belongsTo(Provider, { foreignKey: 'provider_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Catalog.belongsTo(Units, { foreignKey: 'unit_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


export default Catalog;
