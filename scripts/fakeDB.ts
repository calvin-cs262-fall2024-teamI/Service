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
import {
  BuddyMatch,
  ChatMessage,
  ChatRoom,
  Review,
  User,
  UserPreference,
  Workout,
} from "@/models";

const saveRecords = async (
  records: (
    | User
    | UserPreference
    | ChatRoom
    | ChatMessage
    | Review
    | Workout
    | BuddyMatch
  )[]
) => {
  await sequelize.transaction(async transaction => {
    for (const record of records) {
      await record.save({ transaction });
    }
  });
};
//returns a promise
async function main() {
  try {
    await saveRecords(users);
    await saveRecords(userPreferences);
    await saveRecords(chatRooms);
    await saveRecords(chatMessages);
    await saveRecords(reviews);
    await saveRecords(workouts);
    await saveRecords(buddyMatches);
    await sequelize.close();
  } catch (error) {
    console.error("error while saving records:", error);
  }
}

main().catch(error => {
  console.error("Main function failed:", error);
});
