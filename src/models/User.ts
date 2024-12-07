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

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare emailAddress: string;
  declare username: string;
  declare firstName: string;
  declare lastName: string;
  declare age: number;
  declare height_feet: number;
  declare height_inches: number;
  declare weight: CreationOptional<number>;
  declare passwordHash: string;
  declare city: CreationOptional<string>;
  declare gender: CreationOptional<Gender | null>;
  declare profilePictureUrl: CreationOptional<string | null>;
  declare experienceLevel: CreationOptional<ExperienceLevel | null>;
  declare bio: CreationOptional<string | null>;

  // Personal Trainer specific fields
  declare isTrainer: CreationOptional<boolean>;
  declare cost: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
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
      allowNull: true,
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
  },
);
