import { sequelize } from "@/config/database";
import {
  DayOfWeek,
  ExperienceLevel,
  Gender,
  WorkoutTimes,
} from "@/types/enums";
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
  declare preferredExperienceLevel: CreationOptional<ExperienceLevel | null>;
  declare preferredWorkoutTimes: CreationOptional<WorkoutTimes[] | null>;
  declare preferredWorkoutType: CreationOptional<string[]>;
  declare preferredGym: CreationOptional<string[]>;
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
    preferredExperienceLevel: {
      type: DataTypes.ENUM(...Object.values(ExperienceLevel)),
      allowNull: true,
    },
    preferredWorkoutTimes: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(WorkoutTimes))),
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
    preferredGym: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    preferredWorkoutType: {
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
  { sequelize, tableName: "userpreference" },
);
