/**
 * @fileoverview Enumeration types used throughout the application.
 * Defines constants for various categorical data used in the system.
 */

/**
 * User experience levels in fitness and working out
 */
export enum ExperienceLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Expert = "expert",
}

/**
 * Status options for workout sessions
 */
export enum WorkoutStatus {
  Scheduled = "scheduled",
  Completed = "completed",
  Cancelled = "cancelled",
}

/**
 * Status options for buddy match requests
 */
export enum BuddyStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

/**
 * Gender options for user profiles and preferences
 */
export enum Gender {
  Male = "male",
  Female = "female",
}

/**
 * Days of the week for scheduling workouts
 */
export enum DayOfWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

/**
 * Time periods for workout preferences
 */
export enum WorkoutTime {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
}
