/**
 * @fileoverview Database and storage configuration for the application.
 * Sets up Sequelize connection to PostgreSQL and Azure Blob Storage for file handling.
 */

import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { BlobServiceClient } from "@azure/storage-blob";
import multer from "multer";
dotenv.config();

/**
 * Sequelize instance configured for PostgreSQL connection.
 * Uses environment variables for connection details and SSL configuration.
 */
const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  logging: process.env.SQL_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
});

/**
 * Azure Blob Storage client configuration.
 * Sets up connection to Azure storage for handling file uploads.
 */
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!
);

/**
 * Container client for Azure Blob Storage.
 * Handles operations within the specified storage container.
 */
const containerClient = blobServiceClient.getContainerClient(
  process.env.CONTAINER_NAME!
);

/**
 * Multer middleware configuration for handling file uploads.
 * Uses memory storage for temporary file handling before Azure upload.
 */
const uploadFile = multer({ storage: multer.memoryStorage() });

export { sequelize, blobServiceClient, containerClient, uploadFile };
