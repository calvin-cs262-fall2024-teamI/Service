/**
 * @fileoverview Review model definition for user feedback and ratings.
 * Manages reviews and ratings that users give to each other after working out together.
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
 * Represents a review given by one user to another.
 * Contains rating, optional review text, and tracks both reviewer and reviewed users.
 */
export class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  /** Unique identifier for the review */
  declare id: CreationOptional<number>;
  /** ID of the user giving the review */
  declare reviewerId: number;
  /** ID of the user being reviewed */
  declare reviewedId: number;
  /** Numerical rating (1-5) given in the review */
  declare rating: number;
  /** Optional text feedback provided with the review */
  declare reviewText: CreationOptional<string | null>;
  /** Timestamp of when the review was created */
  declare createdAt: CreationOptional<Date>;
  /** Timestamp of when the review was last updated */
  declare updatedAt: CreationOptional<Date>;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    reviewedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    reviewText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "review",
    indexes: [
      {
        fields: ["reviewerId"],
      },
      {
        fields: ["reviewedId"],
      },
    ],
  }
);
