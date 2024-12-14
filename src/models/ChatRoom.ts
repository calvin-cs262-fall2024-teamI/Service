/**
 * @fileoverview ChatRoom model definition for managing chat spaces between users.
 * Handles the creation and management of chat rooms between pairs of users.
 */

import { sequelize } from "@/config/database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { User } from "./User";

/**
 * Represents a chat room between two users.
 * Enforces unique pairings between users and maintains chat history.
 */
export class ChatRoom extends Model<
  InferAttributes<ChatRoom>,
  InferCreationAttributes<ChatRoom>
> {
  /** Unique identifier for the chat room */
  declare id: CreationOptional<number>;
  /** ID of the first user in the chat room */
  declare user1Id: number;
  /** ID of the second user in the chat room */
  declare user2Id: number;
  /** Timestamp of when the chat room was created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the chat room was last updated */
  declare updatedAt: CreationOptional<Date>;
}

ChatRoom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "chatroom",
    indexes: [
      {
        unique: true,
        fields: ["user1Id", "user2Id"],
      },
    ],
    validate: {
      validUserIds() {
        if ((this.user1Id as number) >= (this.user2Id as number)) {
          throw new Error(
            "user1Id must be less than user2Id and cannot be equal"
          );
        }
      },
    },
  }
);
