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

export class UserPreference extends Model<
  InferAttributes<UserPreference>,
  InferCreationAttributes<UserPreference>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare preferredGender: CreationOptional<Gender | null>;
  declare preferredExperienceLevels: CreationOptional<ExperienceLevel[] | null>;
  declare preferredWorkoutTimes: CreationOptional<WorkoutTime[] | null>;
  declare preferredWorkoutTypes: CreationOptional<string[]>;
  declare preferredGyms: CreationOptional<string[]>;
  declare preferredDays: CreationOptional<DayOfWeek[]>;
  declare maxBudget: CreationOptional<number>;
  declare goals: CreationOptional<string[]>;
  declare createdAt: CreationOptional<Date>;
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
