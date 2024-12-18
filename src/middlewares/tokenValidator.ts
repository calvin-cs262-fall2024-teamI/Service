/**
 * @fileoverview JWT token validation middleware.
 * Validates and processes JWT tokens for authenticated routes.
 */

import { JwtPayload } from "@/types";
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

/**
 * Middleware to validate JWT tokens in request headers.
 * Extracts and verifies JWT tokens, attaching decoded user data to the request.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns Response with error if token is invalid, otherwise continues to next middleware
 */
export const tokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new JsonWebTokenError(
      "No token provided, please include it in Authorization header"
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  req.user = decoded;
  next();
};
