import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Users from './users.js';
import University from './university.js';

const Group = connectToDatabase().define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'teacher_id'
  },
  universityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'university_id'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: 'groups',
  timestamps: true,
  underscored: true
});

Users.hasMany(Group, { foreignKey: 'teacher_id' });
Group.belongsTo(Users, { foreignKey: 'teacher_id' });
Group.belongsTo(University, { foreignKey: 'university_id' });

export default Group;
