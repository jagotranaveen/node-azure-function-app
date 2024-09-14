import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres';
import User from './users';
import Entity from './entities';

const tableName = 'addresses';

const Adresses = sequelize.define(
  tableName,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('Registered', 'Trading', 'Other'),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.UUID,
      references: {
        model: Entity,
        key: 'id',
      },
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
Adresses.belongsTo(User, {
  as: 'createdBy',
  foreignKey: 'created_by',
});
Adresses.belongsTo(Entity, {
  as: 'entityData',
  foreignKey: 'entity',
});
export default Adresses;
