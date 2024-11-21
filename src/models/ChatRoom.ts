import { sequelize } from "@/config/database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { User } from "./User";

export class ChatRoom extends Model<
  InferAttributes<ChatRoom>,
  InferCreationAttributes<ChatRoom>
> {
  declare id: CreationOptional<number>;
  declare user1Id: number;
  declare user2Id: number;
  declare createdAt: CreationOptional<Date>;
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
            "user1Id must be less than user2Id and cannot be equal",
          );
        }
      },
    },
  },
);
