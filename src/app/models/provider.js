import { DataTypes } from "sequelize";
import { connectToDatabase } from '../../config/index.js';
import ProviderPaymentOption from "./providerPaymentOptions.js";
import MaterialsByProvider from "./materialsByProvider.js";

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
  logo_filename: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,  
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  delivery_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  volume_discount: {
    type: DataTypes.DECIMAL(5, 2),
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

Provider.hasMany(ProviderPaymentOption, { foreignKey: 'provider_id' });
Provider.hasMany(MaterialsByProvider, { foreignKey: 'provider_id' });


export default Provider;
