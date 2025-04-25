import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import PayrollRoleImprovements from './payrollRoleImprovements.js';
import Users from './users.js';
import PayrollConfiguration from './PayrollConfiguration.js';

const PayrollImprovementsAssignments = connectToDatabase().define('PayrollImprovementsAssignments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_improvement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'payroll_role_improvements',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  configuration_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'payroll_configurations',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'payroll_improvements_assignments',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['role_improvement_id', 'created_by'],
      name: 'payroll_assignments_unique',
    }
  ]
});

PayrollImprovementsAssignments.belongsTo(PayrollRoleImprovements, { foreignKey: 'role_improvement_id' });
PayrollImprovementsAssignments.belongsTo(PayrollConfiguration, { foreignKey: 'configuration_id' });
PayrollImprovementsAssignments.belongsTo(Users, { foreignKey: 'created_by' });
PayrollImprovementsAssignments.belongsTo(Users, { foreignKey: 'updated_by' });


export default PayrollImprovementsAssignments;
