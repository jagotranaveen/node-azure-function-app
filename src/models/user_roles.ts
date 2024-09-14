import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres';

const tableName = 'user_roles';

const UserRoles = sequelize.define(
  tableName,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default UserRoles;
