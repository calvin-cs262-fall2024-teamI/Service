import { Request, Response, Router } from "express";
import { ModelStatic } from "sequelize";
import { asyncHandler } from "@/utils";
import { ApiResponse } from "./responseWrapper";

interface CrudOptions {
  // custom route prefix
  routePrefix?: string;
  // allowed operations
  operations?: ("create" | "read" | "update" | "delete" | "list")[];
  // pagination configuration
  pagination?: {
    defaultLimit: number;
    maxLimit: number;
  };
  // allowed filters
  allowedFilters?: string[];
  // allowed sort fields
  allowedSortFields?: string[];
  // middleware
  middleware?: {
    all?: any[];
    create?: any[];
    read?: any[];
    update?: any[];
    delete?: any[];
    list?: any[];
  };
}

export function createCrudRouter(
  Model: ModelStatic<any>,
  options: CrudOptions = {}
) {
  const router = Router();
  const {
    routePrefix = "",
    operations = ["create", "read", "update", "delete", "list"],
    pagination = { defaultLimit: 30, maxLimit: 80 },
    allowedFilters = [],
    allowedSortFields = [],
    middleware = {},
  } = options;

  // apply common middleware
  if (middleware.all) {
    router.use(middleware.all);
  }

  // list query (supports pagination, filtering, and sorting)
  if (operations.includes("list")) {
    router.get(
      routePrefix + "/",
      ...(middleware.list || []),
      asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = Math.min(
          parseInt(req.query.limit as string) || pagination.defaultLimit,
          pagination.maxLimit
        );
        const offset = (page - 1) * limit;

        // build filter conditions
        const where: any = {};
        allowedFilters.forEach(filter => {
          if (req.query[filter]) {
            where[filter] = req.query[filter];
          }
        });

        // build sort conditions
        const order: any = [];
        if (req.query.sort && allowedSortFields.length > 0) {
          const sortField = (req.query.sort as string).replace(/^-/, "");
          if (allowedSortFields.includes(sortField)) {
            const sortDir = (req.query.sort as string).startsWith("-")
              ? "DESC"
              : "ASC";
            order.push([sortField, sortDir]);
          }
        }

        const { count, rows } = await Model.findAndCountAll({
          where,
          order,
          limit,
          offset,
        });

        res.json(
          ApiResponse.success(rows, undefined, {
            page,
            limit,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
          })
        );
      })
    );
  }

  // create
  if (operations.includes("create")) {
    router.post(
      routePrefix + "/",
      ...(middleware.create || []),
      asyncHandler(async (req: Request, res: Response) => {
        const item = await Model.create(req.body);
        res.status(201).json(item);
      })
    );
  }

  // read
  if (operations.includes("read")) {
    router.get(
      routePrefix + "/:id",
      ...(middleware.read || []),
      asyncHandler(async (req: Request, res: Response) => {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
          res.status(404).json(ApiResponse.error("Resource not found"));
          return;
        }
        res.json(item);
      })
    );
  }

  // update
  if (operations.includes("update")) {
    router.put(
      routePrefix + "/:id",
      ...(middleware.update || []),
      asyncHandler(async (req: Request, res: Response) => {
        const item = await Model.update(req.body, {
          where: { id: req.params.id },
        });
        if (!item) {
          res.status(404).json(ApiResponse.error("Resource not found"));
          return;
        }
        res.json(item);
      })
    );
  }

  // delete
  if (operations.includes("delete")) {
    router.delete(
      routePrefix + "/:id",
      ...(middleware.delete || []),
      asyncHandler(async (req: Request, res: Response) => {
        const item = await Model.destroy({ where: { id: req.params.id } });
        if (!item) {
          res.status(404).json(ApiResponse.error("Resource not found"));
          return;
        }
        res.status(204).send();
      })
    );
  }

  return router;
}
