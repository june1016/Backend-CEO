import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import Improvement from './improvements.js';
import PayrollRole from './payrollRoles.js';

const PayrollRoleImprovements = connectToDatabase().define('PayrollRoleImprovements', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PayrollRole,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  improvement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'improvements',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'payroll_role_improvements',
  timestamps: false,
});

PayrollRoleImprovements.belongsTo(Improvement, { foreignKey: 'improvement_id'});
PayrollRoleImprovements.belongsTo(PayrollRole, { foreignKey: 'role_id'});

export default PayrollRoleImprovements;
