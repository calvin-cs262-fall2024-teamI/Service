import app from "@/app";
import { sequelize, containerClient } from "@/config/database";
import { getLocalIP } from "@/utils";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

// start server
async function startServer() {
  try {
    //test database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
  //test azure blob storage connection
  try {
    console.log("Checking Azure Blob Storage connection...");
    const exists = await containerClient.exists();
    if (exists) {
      console.log(
        "Azure Blob Storage is successfully connected, and container exists."
      ); //TODO: REMOVE
    } else {
      throw new Error(
        `Container '${process.env.CONTAINER_NAME}' does not exist.`
      ); // TODO: REMOVE
    }
  } catch (error) {
    console.error("Azure Blob Storage connection test failed:", error);
    throw error; // Re-throw error for centralized error handling
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

startServer().catch(error => {
  console.error("starting server failed:", error);
  process.exit(1); // Ensure the process exits with failure if the server fails to start
});
