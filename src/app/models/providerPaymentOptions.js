import { DataTypes } from "sequelize";
import { connectToDatabase } from '../../config/index.js';

const ProviderPaymentOption = connectToDatabase().define("provider_payment_options", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  option: {
    type: DataTypes.STRING,
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
  tableName: 'provider_payment_options',
  timestamps: false
});

export default ProviderPaymentOption;
