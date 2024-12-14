/**
 * @fileoverview CRUD route generator utility for Sequelize models.
 * Provides automated creation of RESTful API endpoints with customizable options.
 */

import { tokenValidator } from "@/middlewares";
import { asyncHandler } from "@/utils";
import { Request, Response, Router } from "express";
import { ModelStatic, UniqueConstraintError } from "sequelize";
import { ApiResponse } from "./responseWrapper";

/**
 * Configuration options for CRUD route generation
 */
interface CrudOptions {
  /** Base URL prefix for all routes */
  routePrefix?: string;
  /** Allowed CRUD operations */
  operations?: ("create" | "read" | "update" | "delete" | "list")[];
  /** Pagination settings */
  pagination?: {
    defaultLimit: number;
    maxLimit: number;
  };
  /** Fields that can be used for filtering */
  allowedFilters?: string[];
  /** Fields that can be used for sorting */
  allowedSortFields?: string[];
  /** Middleware configuration per operation */
  middleware?: {
    all?: any[];
    create?: any[];
    read?: any[];
    update?: any[];
    delete?: any[];
    list?: any[];
  };
  /** Fields to exclude from responses */
  excludeFields?: string[];
}

/**
 * Creates a router with CRUD endpoints for a Sequelize model
 * @param Model - Sequelize model to create routes for
 * @param options - Configuration options for route generation
 * @returns Express router with configured CRUD endpoints
 */
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
    allowedSortFields = ["age", "cost"],
    middleware = {},
    excludeFields = [],
  } = options;

  // TODO: exclude some fields from response

  // all the routes will be protected by token validator
  middleware.all = [tokenValidator, ...(middleware.all || [])];

  // apply common middleware
  if (middleware.all) {
    router.use(routePrefix, middleware.all);
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

        const where: any = {};
        const modelAttributes = Object.keys(Model.getAttributes());

        // Filter based on all available model attributes
        Object.keys(req.query).forEach(key => {
          if (modelAttributes.includes(key) && req.query[key] !== undefined) {
            where[key] = req.query[key];
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
  // node_modules/sequelize/src/dialects/postgres/query.js
  // create
  if (operations.includes("create")) {
    router.post(
      routePrefix + "/",
      ...(middleware.create || []),
      asyncHandler(async (req: Request, res: Response) => {
        try {
          const item = await Model.create(req.body);
          res.status(201).json(item);
        } catch (error) {
          if (error instanceof UniqueConstraintError) {
            throw new Error(
              Object.values(error.errors)
                .map(e => e.message)
                .join(", ")
            );
          }
          throw error;
        }
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
        const [, [item]] = await Model.update(req.body, {
          where: { id: req.params.id },
          returning: true,
        });
        if (!item) throw new Error("Resource not found");
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
