import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Group from './group.js';
import Users from './users.js';

const GroupStudent = connectToDatabase().define('GroupStudent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'group_id'
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'student_id'
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
  tableName: 'group_students',
  timestamps: true,
  underscored: true
});

Users.hasMany(GroupStudent, { foreignKey: 'student_id' });
GroupStudent.belongsTo(Users, { foreignKey: 'student_id' });

Group.hasMany(GroupStudent, { foreignKey: 'group_id' });
GroupStudent.belongsTo(Group, { foreignKey: 'group_id' });

export default GroupStudent;
