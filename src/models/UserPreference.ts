/**
 * @fileoverview UserPreference model definition for storing user workout preferences.
 * Manages user preferences for workout partners, times, and training goals.
 */

import { sequelize } from "@/config/database";
import { DayOfWeek, ExperienceLevel, Gender, WorkoutTime } from "@/types/enums";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { User } from "./User";

/**
 * Represents a user's workout preferences and matching criteria.
 * Stores preferences for workout partners, schedules, and training goals.
 */
export class UserPreference extends Model<
  InferAttributes<UserPreference>,
  InferCreationAttributes<UserPreference>
> {
  /** Unique identifier for the preference set */
  declare id: CreationOptional<number>;
  /** ID of the user these preferences belong to */
  declare userId: number;
  /** Preferred gender for workout partners */
  declare preferredGender: CreationOptional<Gender | null>;
  /** Preferred experience levels for workout partners */
  declare preferredExperienceLevels: CreationOptional<ExperienceLevel[] | null>;
  /** Preferred times of day for workouts */
  declare preferredWorkoutTimes: CreationOptional<WorkoutTime[] | null>;
  /** Types of workouts the user is interested in */
  declare preferredWorkoutTypes: CreationOptional<string[]>;
  /** Gyms or locations the user prefers to work out at */
  declare preferredGyms: CreationOptional<string[]>;
  /** Days of the week the user prefers to work out */
  declare preferredDays: CreationOptional<DayOfWeek[]>;
  /** Maximum budget for personal training */
  declare maxBudget: CreationOptional<number>;
  /** User's fitness and training goals */
  declare goals: CreationOptional<string[]>;
  /** Timestamp of when the preferences were created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the preferences were last updated */
  declare updatedAt: CreationOptional<Date>;
}

UserPreference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    preferredGender: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true,
    },
    preferredExperienceLevels: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(ExperienceLevel))),
      allowNull: true,
    },
    preferredWorkoutTimes: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(WorkoutTime))),
      allowNull: true,
    },
    preferredDays: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(DayOfWeek))),
      allowNull: true,
    },
    maxBudget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    preferredGyms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    preferredWorkoutTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    goals: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: "userpreference" }
);
