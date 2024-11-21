import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/responseWrapper";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);

  res.status(500).json(ApiResponse.error(err.message));
};
