import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';

const Units = connectToDatabase().define('Units', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    tableName: 'units',
    underscored: true
});

Users.hasMany(Units, { foreignKey: 'created_by' });
Users.hasMany(Units, { foreignKey: 'updated_by' });
Units.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
Units.belongsTo(Users, { foreignKey: 'updated_by', as: 'updater' });

export default Units;