import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres';
import User from './users';
import Entity from './entities';

const tableName = 'shareholders';

const ShareHolders = sequelize.define(
  tableName,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('Individual', 'Corporate'),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    legal_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Invalid email address',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_shares: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    share_percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
ShareHolders.belongsTo(User, {
  as: 'createdBy',
  foreignKey: 'created_by',
});
ShareHolders.belongsTo(Entity, {
  as: 'entityData',
  foreignKey: 'entity',
});
export default ShareHolders;
