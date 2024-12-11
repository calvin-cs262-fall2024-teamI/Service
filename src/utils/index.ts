import { NextFunction, Request, Response, Router } from "express";
import { networkInterfaces } from "os";

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

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
