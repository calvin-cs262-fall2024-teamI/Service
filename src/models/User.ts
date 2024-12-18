/**
 * @fileoverview User model definition for managing user accounts and profiles.
 * Handles user authentication, profile information, and trainer-specific details.
 */

import { sequelize } from "@/config/database";
import { ExperienceLevel, Gender } from "@/types/enums";
import * as bcrypt from "bcrypt";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

/**
 * Represents a user in the system.
 * Contains personal information, fitness details, and authentication data.
 */
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  /** Unique identifier for the user */
  declare id: CreationOptional<number>;
  /** User's email address for authentication and communication */
  declare emailAddress: string;
  /** User's chosen username */
  declare username: string;
  /** User's first name */
  declare firstName: string;
  /** User's last name */
  declare lastName: string;
  /** User's age */
  declare age: number;
  /** User's height in feet */
  declare height_feet: number;
  /** User's height in inches */
  declare height_inches: number;
  /** User's weight in pounds */
  declare weight: number;
  /** Hashed password for authentication */
  declare passwordHash: string;
  /** User's city location */
  declare city: string;
  /** User's gender */
  declare gender: CreationOptional<Gender | null>;
  /** URL to user's profile picture */
  declare profilePictureUrl: CreationOptional<string | null>;
  /** User's fitness experience level */
  declare experienceLevel: CreationOptional<ExperienceLevel | null>;
  /** User's bio or description */
  declare bio: CreationOptional<string | null>;

  /** Whether the user is a personal trainer */
  declare isTrainer: CreationOptional<boolean>;
  /** Trainer's hourly rate if applicable */
  declare cost: CreationOptional<number>;

  /** Timestamp of when the user account was created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the user account was last updated */
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    emailAddress: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    height_feet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_inches: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(256),
      allowNull: false,
      set(value: string) {
        // Hash the password using bcrypt with a salt round of 10
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue("passwordHash", hashedPassword);
      },
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true,
    },
    profilePictureUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isUrl: true },
    },
    experienceLevel: {
      type: DataTypes.ENUM(...Object.values(ExperienceLevel)),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isTrainer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cost: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "user",
    indexes: [
      {
        fields: ["emailAddress"],
      },
      {
        fields: ["username"],
      },
    ],
  }
);
