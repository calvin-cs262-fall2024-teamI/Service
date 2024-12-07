import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { BlobServiceClient } from "@azure/storage-blob";
import multer from "multer";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  // logging: false,
  logging: process.env.SQL_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
});

//configure Azure Blob storage
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!,
);
const containerClient = blobServiceClient.getContainerClient(
  process.env.CONTAINER_NAME!,
);

//Set Up Multer for File Upload Handling
const fileUpload = multer({ storage: multer.memoryStorage() });

export { sequelize, blobServiceClient, containerClient, fileUpload };
