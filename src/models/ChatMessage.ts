/**
 * @fileoverview ChatMessage model definition for storing user chat messages.
 * Manages the messages sent between users in chat rooms.
 */

import { sequelize } from "@/config/database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { ChatRoom } from "./ChatRoom";
import { User } from "./User";

/**
 * Represents a chat message sent between users.
 * Contains the message content and metadata about sender and chat room.
 */
export class ChatMessage extends Model<
  InferAttributes<ChatMessage>,
  InferCreationAttributes<ChatMessage>
> {
  /** Unique identifier for the message */
  declare id: CreationOptional<number>;
  /** ID of the chat room where the message was sent */
  declare chatRoomId: number;
  /** ID of the user who sent the message */
  declare senderId: number;
  /** Content of the message */
  declare messageText: string;
  /** Timestamp of when the message was created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the message was last updated */
  declare updatedAt: CreationOptional<Date>;
}

ChatMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatRoom,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    messageText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "chatmessage",
    indexes: [
      {
        fields: ["chatRoomId"],
      },
      {
        fields: ["senderId"],
      },
    ],
  }
);
