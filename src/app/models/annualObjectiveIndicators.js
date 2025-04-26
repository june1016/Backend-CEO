import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import Literals from './literals.js';
import Units from './units.js';
import IndicatorTitles from './IndicatorTitles.js';

const AnnualObjectiveIndicators = connectToDatabase().define('AnnualObjectiveIndicators', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: IndicatorTitles,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    literal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Literals,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Units,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    value: {
        type: DataTypes.DECIMAL(50, 2),
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Users,
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'annual_objective_indicators',
    underscored: true
});

IndicatorTitles.hasMany(AnnualObjectiveIndicators, { foreignKey: 'title_id', onDelete: 'RESTRICT' });
AnnualObjectiveIndicators.belongsTo(IndicatorTitles, { foreignKey: 'title_id' });

Literals.hasMany(AnnualObjectiveIndicators, { foreignKey: 'literal_id' });
AnnualObjectiveIndicators.belongsTo(Literals, { foreignKey: 'literal_id' });

Units.hasMany(AnnualObjectiveIndicators, { foreignKey: 'unit_id' });
AnnualObjectiveIndicators.belongsTo(Units, { foreignKey: 'unit_id' });

Users.hasMany(AnnualObjectiveIndicators, { foreignKey: 'created_by' });
Users.hasMany(AnnualObjectiveIndicators, { foreignKey: 'updated_by' });
AnnualObjectiveIndicators.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
AnnualObjectiveIndicators.belongsTo(Users, { foreignKey: 'updated_by', as: 'updater' });

export default AnnualObjectiveIndicators;
