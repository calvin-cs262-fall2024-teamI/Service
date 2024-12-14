/**
 * @fileoverview Main Express application setup and configuration.
 * Configures middleware, routes, and error handling for the SwoleMate API.
 */

import { errorHandler, responseHandler } from "@/middlewares";
import { authRouter, crudRoutes } from "@/routes";
import { ApiResponse } from "@/utils/responseWrapper";
import cors from "cors";
import express from "express";
import helmet from "helmet";

/**
 * Express application instance for the SwoleMate API.
 * Configured with security middleware, response handling, and API routes.
 */
const app = express();

//Configure Azure Blob Storage

/**
 * Middleware Configuration
 * - cors: Enables Cross-Origin Resource Sharing
 * - helmet: Adds security headers
 * - express.json: Parses JSON request bodies
 */
app.use(cors());
app.use(helmet());
app.use(express.json());

/**
 * Response Wrapper Middleware
 * Ensures consistent API response format across all routes
 */
app.use(responseHandler);

/**
 * API Routes Configuration
 * - CRUD routes: Generated routes for database models
 * - Auth routes: Authentication and user management
 */
crudRoutes.forEach(route => app.use("/api", route));
app.use("/api/auth", authRouter);

/**
 * Root endpoint handler
 * Returns a welcome message for the API
 */
app.get("/", (req, res) => {
  res.status(200).send(ApiResponse.info("Welcome to SwoleMate API"));
});

/**
 * 404 Not Found handler
 * Catches requests to undefined routes
 */
app.use((req, res) => {
  res.status(404).send(ApiResponse.error("Not found"));
});

/**
 * Global error handling middleware
 * Catches and formats all uncaught errors in the application
 */
app.use(errorHandler);

export default app;
