/**
 * @fileoverview Global error handling middleware for the application.
 * Provides consistent error response format for all uncaught errors.
 */

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/responseWrapper";

/**
 * Express error handling middleware.
 * Catches all uncaught errors and formats them into consistent API responses.
 *
 * @param err - Error object thrown in the application
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json(ApiResponse.error(err.message));
};
