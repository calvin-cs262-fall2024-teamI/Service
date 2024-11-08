import dotenv from "dotenv";
import { Pool } from "pg";
import { Sequelize } from "sequelize";

dotenv.config();

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  ssl: {
    rejectUnauthorized: false, // set to true in production
  },
});

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  // logging: false,
  logging: console.log,
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
  // define: {
  //   freezeTableName: true,
  // },
});

export { pool, sequelize };
