/**
 * @fileoverview Application entry point that initializes and starts the Express server.
 * Handles database connection, Azure storage setup, and server startup.
 */

import app from "@/app";
import { sequelize, containerClient } from "@/config/database";
import { getLocalIP } from "@/utils";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

/**
 * Initializes and starts the server.
 * Verifies database and Azure Blob Storage connections before starting Express.
 */
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }

  // Test Azure blob storage connection
  try {
    console.log("Checking Azure Blob Storage connection...");
    const exists = await containerClient.exists();
    if (exists) {
      console.log(
        "Azure Blob Storage is successfully connected, and container exists."
      );
    } else {
      throw new Error(
        `Container '${process.env.CONTAINER_NAME}' does not exist.`
      );
    }
  } catch (error) {
    console.error("Azure Blob Storage connection test failed:", error);
    throw error;
  }

  try {
    app.listen(Number(port), "0.0.0.0", () => {
      console.log(`Server is running on http://${getLocalIP()}:${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

// Start the server and handle any startup errors
startServer().catch(error => {
  console.error("starting server failed:", error);
  process.exit(1);
});
