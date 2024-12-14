import { sequelize } from "@/config/database";
import { WorkoutStatus } from "@/types/enums";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { User } from "./User";

/**
 * Represents a workout session between users.
 * Tracks workout details, participants, and session status.
 */
export class Workout extends Model<
  InferAttributes<Workout>,
  InferCreationAttributes<Workout>
> {
  /** Unique identifier for the workout session */
  declare id: CreationOptional<number>;
  /** ID of the user who created the workout */
  declare creatorId: number;
  /** ID of the partner user (if any) */
  declare partnerId: CreationOptional<number | null>;
  /** Scheduled time for the workout */
  declare workoutTime: Date;
  /** Location where the workout will take place */
  declare location: CreationOptional<string | null>;
  /** Current status of the workout (scheduled/completed/cancelled) */
  declare status: WorkoutStatus;
  /** Additional notes about the workout */
  declare notes: CreationOptional<string | null>;
  /** Timestamp of when the workout was created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the workout was last updated */
  declare updatedAt: CreationOptional<Date>;
}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    workoutTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(WorkoutStatus)),
      defaultValue: WorkoutStatus.Scheduled,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "workout",
    indexes: [
      {
        fields: ["creatorId"],
      },
      {
        fields: ["partnerId"],
      },
    ],
  }
);
