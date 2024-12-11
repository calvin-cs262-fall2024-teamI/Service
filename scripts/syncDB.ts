import { sequelize } from "@/config/database";
import * as models from "@/models";

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
