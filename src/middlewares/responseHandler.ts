import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/responseWrapper";

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: based on status code, return different format
  // Extend response object
  const originalJson = res.json;
  res.json = function (body: any) {
    // If response is already in ApiResponse format, return directly
    if (body instanceof ApiResponse) {
      return originalJson.call(this, body);
    }
    // Otherwise wrap it in ApiResponse format
    return originalJson.call(this, ApiResponse.success(body));
  };
  next();
};
