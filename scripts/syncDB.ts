/**
 * @fileoverview Database synchronization script that creates or updates database tables
 * based on the Sequelize model definitions. Can perform both safe migrations and force sync.
 */

import { sequelize } from "@/config/database";
import * as models from "@/models";

/**
 * Synchronizes the database schema with the defined models.
 * If 'force' argument is provided, drops and recreates all tables.
 * Otherwise, attempts to alter tables to match current model definitions.
 *
 * @example
 * // Normal sync (alter tables)
 * npm run sync-db
 *
 * @example
 * // Force sync (drop and recreate)
 * npm run sync-db force
 */
async function syncDatabase() {
  console.log("Syncing database...");
  const force = process.argv[2] === "force";

  try {
    for (const model of Object.values(models)) {
      console.log(`Syncing model: ${model.name}`);
      await model.sync({ force, alter: !force });
    }
    console.log("Database synced successfully");
    await sequelize.close();
  } catch (error) {
    console.error("Failed to sync database:", error);
    await sequelize.close();
    process.exit(1);
  }
}

// Await the promise here
syncDatabase().catch(error => {
  console.error("syncDatabase failed:", error);
  process.exit(1);
});
