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

export class Workout extends Model<
  InferAttributes<Workout>,
  InferCreationAttributes<Workout>
> {
  declare id: CreationOptional<number>;
  declare creatorId: number;
  declare partnerId: CreationOptional<number | null>;
  declare workoutTime: Date;
  declare location: CreationOptional<string | null>;
  declare status: WorkoutStatus;
  declare notes: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
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
  },
);
