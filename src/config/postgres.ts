import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  username: "hspadmin",
  password: "Aug@2024",
  database: "gxmuserdb",
  host: "gxmdevdb.postgres.database.azure.com",
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
export default sequelize;
