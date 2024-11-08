import { sequelize } from "@/config/database";
import * as models from "@/models";

async function syncDatabase() {
  console.log("Syncing database...");

  try {
    for (const model of Object.values(models)) {
      console.log(`Syncing model: ${model.name}`);
      await model.sync({ alter: true });
    }
    console.log("Database synced successfully");
    await sequelize.close();
  } catch (error) {
    console.error("Failed to sync database:", error);
    await sequelize.close();
    process.exit(1);
  }
}

syncDatabase();
