import { sequelize } from "@/config/database";
import {
  users,
  userPreferences,
  chatRooms,
  chatMessages,
  reviews,
  workouts,
  buddyMatches,
} from "./sample_data";

const saveRecords = async (records: any[]) => {
  await sequelize.transaction(async transaction => {
    for (const record of records) {
      await record.save({ transaction });
    }
  });
};

async function main() {
  await saveRecords(users);
  await saveRecords(userPreferences);
  await saveRecords(chatRooms);
  await saveRecords(chatMessages);
  await saveRecords(reviews);
  await saveRecords(workouts);
  await saveRecords(buddyMatches);
  await sequelize.close();
}

main();
