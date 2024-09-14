import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres';
import User from './users';

const tableName = 'documents';

const Documents = sequelize.define(
  tableName,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('General', 'Contract', 'Invoice'),
      allowNull: false,
    },
    download_url: {
      type: DataTypes.STRING,
      allowNull: false,
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
Documents.belongsTo(User, {
  as: 'createdBy',
  foreignKey: 'created_by',
});
export default Documents;
