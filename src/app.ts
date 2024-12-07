import { errorHandler, responseHandler } from "@/middlewares";
import { authRouter, crudRoutes } from "@/routes";
import { ApiResponse } from "@/utils/responseWrapper";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

//Configure Azure Blob Storage

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// response wrapper middleware
app.use(responseHandler);

crudRoutes.forEach((route) => app.use("/api", route));
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.status(200).send(ApiResponse.info("Welcome to SwoleMate API"));
});
app.use((req, res) => {
  res.status(404).send(ApiResponse.error("Not found"));
});

// error handling middleware (should be placed after routes)
app.use(errorHandler);

export default app;
