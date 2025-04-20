import { DataTypes } from "sequelize";
import { connectToDatabase } from '../../config/index.js';
import CommercialCondition from "./commercialConditions.js";

const Provider = connectToDatabase().define("providers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commercial_conditions_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CommercialCondition,
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
  tableName: 'providers',
  timestamps: false
});

Provider.belongsTo(CommercialCondition, { foreignKey: 'commercial_conditions_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Provider;
