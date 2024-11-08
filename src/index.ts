import { sequelize } from "@/config/database";
import { errorHandler, responseHandler } from "@/middlewares";
import { authRouter, crudRoutes } from "@/routes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(responseHandler);

crudRoutes.forEach(route => app.use("/api", route));
app.use("/api/auth", authRouter);

// error handling middleware (should be placed after routes)
app.use(errorHandler);

// start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
  try {
    app.listen(Number(port), "0.0.0.0", () => {
      console.log(`Server is running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
