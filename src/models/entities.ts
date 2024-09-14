import { DataTypes } from 'sequelize';
import sequelize from "../config/postgres";
import User from './users';

const tableName = 'entities';

const Entity = sequelize.define(
  tableName,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domains: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        'Company',
        'Individual',
        'C-Corp',
        'S-Corp',
        'Warehouse',
        'LLC'
      ),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'active',
        'action-required',
        'incomplete',
        'non-compliant',
        'dormant'
      ),
      allowNull: false,
    },
    account_manager: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    point_contact: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    parent: {
      type: DataTypes.UUID,
      references: {
        model: tableName,
        key: 'id',
      },
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Entity.belongsTo(User, { as: 'accountManager', foreignKey: 'account_manager' });
Entity.belongsTo(User, { as: 'pointContact', foreignKey: 'point_contact' });

export default Entity;
