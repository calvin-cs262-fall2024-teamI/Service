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

export class BuddyMatch extends Model<
  InferAttributes<BuddyMatch>,
  InferCreationAttributes<BuddyMatch>
> {
  declare id: CreationOptional<number>;
  declare requesterId: number;
  declare receiverId: number;
  declare status: BuddyStatus;
  declare createdAt: CreationOptional<Date>;
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
