import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';

const IndicatorTitles = connectToDatabase().define('IndicatorTitles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'indicator_titles',
    underscored: true
});

export default IndicatorTitles;
