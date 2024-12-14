/**
 * @fileoverview Common utility functions used throughout the application.
 * Provides error handling, routing, and network utilities.
 */

import { NextFunction, Request, Response, Router } from "express";
import { networkInterfaces } from "os";

/**
 * Wraps async route handlers to properly catch and forward errors
 * @param fn - Async function to wrap
 * @returns Wrapped function that forwards errors to Express error handling
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Creates an Express router with automatic async handler wrapping
 * @returns Router instance with wrapped async handlers
 */
export const RouterWithAsyncHandler = () => {
  const router = Router();
  const methods = ["get", "post", "put", "delete"] as const;

  methods.forEach(method => {
    const original = router[method].bind(router);
    router[method] = function (path: any, ...handlers: any[]) {
      const wrappedHandlers = handlers.map(handler => asyncHandler(handler));
      return original(path, ...wrappedHandlers);
    };
  });

  return router;
};

/**
 * Gets the local IPv4 address of the machine
 * @returns The first non-internal IPv4 address found, or "0.0.0.0" if none found
 */
export const getLocalIP = () => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (!net.internal && net.family === "IPv4") {
        return net.address;
      }
    }
  }
  return "0.0.0.0";
};
