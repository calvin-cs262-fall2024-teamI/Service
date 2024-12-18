/**
 * @fileoverview BuddyMatch model definition for managing workout partner relationships.
 * Handles the connection and status between users who want to work out together.
 */

import { sequelize } from "@/config/database";
import { BuddyStatus } from "@/types/enums";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { User } from "./User";

/**
 * Represents a buddy match relationship between two users.
 * Tracks the status of workout partner requests and connections.
 */
export class BuddyMatch extends Model<
  InferAttributes<BuddyMatch>,
  InferCreationAttributes<BuddyMatch>
> {
  /** Unique identifier for the buddy match */
  declare id: CreationOptional<number>;
  /** ID of the user who initiated the buddy request */
  declare requesterId: number;
  /** ID of the user who received the buddy request */
  declare receiverId: number;
  /** Current status of the buddy match (pending/accepted/rejected) */
  declare status: BuddyStatus;
  /** Timestamp of when the match was created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the match was last updated */
  declare updatedAt: CreationOptional<Date>;
}

BuddyMatch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BuddyStatus)),
      allowNull: false,
      defaultValue: BuddyStatus.Pending,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: "buddymatch" }
);
