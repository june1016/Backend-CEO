import { DataTypes } from 'sequelize';
import { connectToDatabase } from '../../config/index.js';
import PayrollConfiguration from './payrollConfigurationModel.js';
import Machine from './machine.js';
import Shift from './shifts.js';

const MachineShiftAssignment = connectToDatabase().define('MachineShiftAssignment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  configuration_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PayrollConfiguration,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  machine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Machine,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  shift_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Shift,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  operator_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: 'machine_shift_assignments',
  timestamps: false,
});

PayrollConfiguration.hasMany(MachineShiftAssignment, { foreignKey: 'configuration_id' });
MachineShiftAssignment.belongsTo(PayrollConfiguration, { foreignKey: 'configuration_id' });

Machine.hasMany(MachineShiftAssignment, { foreignKey: 'machine_id' });
MachineShiftAssignment.belongsTo(Machine, { foreignKey: 'machine_id' });

Shift.hasMany(MachineShiftAssignment, { foreignKey: 'shift_id' });
MachineShiftAssignment.belongsTo(Shift, { foreignKey: 'shift_id' });

export default MachineShiftAssignment;
