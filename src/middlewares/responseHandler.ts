/**
 * @fileoverview Response formatting middleware.
 * Ensures consistent API response format across all routes.
 */

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/responseWrapper";

/**
 * Middleware that wraps all API responses in a consistent format.
 * Extends Express response object to automatically wrap responses in ApiResponse format.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json;
  res.json = function (body: unknown) {
    if (body instanceof ApiResponse) {
      return originalJson.call(this, body);
    }
    return originalJson.call(this, ApiResponse.success(body));
  };
  next();
};
