import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  // logging: false,
  logging: process.env.SQL_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

export { sequelize };
