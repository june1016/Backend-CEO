import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Literals from './literals.js'; // Importing the Literals model

/* Defining a Sequelize model named `AnnualObjectiveIndicators` */
const AnnualObjectiveIndicators = connectToDatabase().define('AnnualObjectiveIndicators', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  product: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  account: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  literal_id: { // Foreign key referencing Literals
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Literals,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
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
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  tableName: 'annual_objective_indicators',
  timestamps: true,
  underscored: true
});

/* Defining the relationship: One `Literals` record can be referenced by multiple `AnnualObjectiveIndicators` records */
AnnualObjectiveIndicators.belongsTo(Literals, { foreignKey: 'literal_id', as: 'literal' });
Literals.hasMany(AnnualObjectiveIndicators, { foreignKey: 'literal_id', as: 'objective_indicators' });

export default AnnualObjectiveIndicators;
