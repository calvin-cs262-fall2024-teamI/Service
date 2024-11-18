import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  logging: process.env.SQL_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
  retry: {
    max: 3, // Retry max 3 times
    match: [/SequelizeConnectionRefusedError/, /ECONNREFUSED/], // Match the connection refused errors
  },
});
// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch(error => {
    console.error("Unable to connect to the database:", error);
  });
export { sequelize };
