import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';

const MarketingConfiguration = connectToDatabase().define('MarketingConfiguration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  percent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  }
}, {
  tableName: 'marketing_configurations',
  timestamps: true,
  underscored: true,
});

// Relaciones
MarketingConfiguration.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(MarketingConfiguration, { foreignKey: 'user_id' });

export default MarketingConfiguration;
