/**
 * @fileoverview Script to populate the database with sample data for development/testing purposes.
 * This script imports sample data and saves it to the database using Sequelize transactions.
 */

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

/**
 * Saves an array of database records within a transaction.
 * @param records - Array of model instances to be saved to the database
 * @returns Promise that resolves when all records are saved
 */
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

/**
 * Main function that orchestrates the database population process.
 * Saves all sample data in sequence and closes the database connection.
 * @returns Promise that resolves when all data is saved
 */
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
