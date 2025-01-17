/**
 * @fileoverview Authentication routes for user registration, login, and token management.
 * Handles user authentication, profile picture uploads, and JWT token refresh.
 */

import { User } from "@/models/User";
import { JwtPayload, JwtPayloadRaw } from "@/types";
import { RouterWithAsyncHandler } from "@/utils";
import { ApiResponse } from "@/utils/responseWrapper";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ExperienceLevel, Gender } from "@/types/enums";
import { asyncHandler } from "@/utils";
import {
  uploadFile,
  containerClient,
  // blobServiceClient,
} from "@/config/database";

/** Express router for authentication endpoints */
const authRouter = RouterWithAsyncHandler();

/** Request body interface for login endpoint */
interface LoginRequest {
  emailAddress: string;
  password: string;
}

/** Request body interface for registration endpoint */
interface RegisterRequest {
  emailAddress: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  height_feet: number;
  height_inches: number;
  weight: number;
  gender: Gender | null;
  profilePictureUrl: string | null;
  experienceLevel: ExperienceLevel | null;
  bio: string | null;
  isTrainer: boolean | null;
  cost: number | null;
}

/**
 * Login route handler
 * Authenticates user credentials and returns JWT tokens
 */
authRouter.post("/login", async (req: Request, res: Response) => {
  const { emailAddress, password }: LoginRequest = req.body;

  // Find user
  const user = await User.findOne<User>({ where: { emailAddress } });
  if (!user) throw new Error("Invalid credential, user not found");

  // Check password
  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!isValidPassword) {
    res.status(401).json(ApiResponse.error("Invalid credentials"));
    return;
  }

  const { id, username } = user;
  const { accessToken, refreshToken } = generateTokens(user);

  // You may want to store refresh token in database here
  //send json response
  res.json({
    id,
    username,
    emailAddress,
    accessToken,
    refreshToken,
  });
});

/**
 * Registration route handler
 * Creates new user account and returns JWT tokens
 */
authRouter.post("/register", async (req: Request, res: Response) => {
  const {
    emailAddress,
    password,
    username,
    firstName,
    lastName,
    age,
    city,
    height_feet,
    height_inches,
    weight,
    gender,
    profilePictureUrl,
    experienceLevel,
    bio,
    isTrainer,
    cost,
  }: RegisterRequest = req.body;
  //check if  email or username already exists
  const existingEmail = await User.findOne({ where: { emailAddress } });
  const existingUsername = await User.findOne({ where: { username } });
  if (existingEmail) {
    res.status(400).json(ApiResponse.error("email address is already in use"));
    return;
  }
  if (existingUsername) {
    res.status(400).json(ApiResponse.error("username is already in use"));
    return;
  }
  try {
    //create a new user model
    const newUser = await User.create({
      emailAddress,
      username,
      firstName,
      lastName,
      age,
      height_feet,
      height_inches,
      weight,
      city,
      gender,
      profilePictureUrl,
      experienceLevel,
      bio,
      passwordHash: password, // Plain password passed, hashing handled by the model's hook
      isTrainer: isTrainer || false,
      cost: cost || 0,
    });
    //generate tokens
    const { accessToken, refreshToken } = generateTokens(newUser);
    //send response, which can be used to login in the client
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      emailAddress: newUser.emailAddress,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ApiResponse.error("Error registering user"));
  }
});

/**
 * Profile picture upload route handler
 * Handles file upload to Azure Blob Storage and updates user profile
 */
authRouter.post(
  "/upload-profile-picture/:id",
  uploadFile.single("profilePicture"), // Middleware to handle single file upload with key "profilePicture"
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file;

    // Debugging: Log the incoming file and request body
    console.log("Incoming file:", file);
    console.log("Request Body:", req.body);

    if (!file) {
      console.error("No file uploaded.");
      return res.status(400).json(ApiResponse.error("No file uploaded."));
    }

    try {
      // Log the file details
      console.log("File details:");
      console.log(`Original Name: ${file.originalname}`);
      console.log(`MIME Type: ${file.mimetype}`);
      console.log(`File Size: ${file.size} bytes`);

      // Generate a unique blob name using userId, timestamp, and the original file name
      const blobName = `${id}-${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Debugging: Log the blob upload process
      console.log("Uploading to Azure Blob Storage...");

      // Upload the file to Azure Blob Storage
      await blockBlobClient.upload(file.buffer, file.buffer.length, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });

      const blobUrl = blockBlobClient.url;
      console.log("File uploaded successfully, Blob URL:", blobUrl);

      // Retrieve the user from the database using the provided userId
      const user = await User.findByPk(id);
      if (!user) {
        console.error("User not found.");
        return res.status(404).json(ApiResponse.error("User not found."));
      }

      // Debugging: Log the user profile update
      console.log("Updating user profile with new profile picture URL...");

      // Update the user's profilePictureUrl field in the database
      user.profilePictureUrl = blobUrl;
      await user.save();

      console.log("Profile picture updated successfully.");

      res.status(200).json({
        message: "Profile picture uploaded successfully.",
        profilePictureUrl: blobUrl,
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res
        .status(500)
        .json(ApiResponse.error("Error uploading profile picture."));
    }
  })
);

/**
 * Token refresh route handler
 * Issues new access and refresh tokens using valid refresh token
 */
authRouter.post(
  "/refresh",
  asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken }: { refreshToken: string } = req.body;

    if (!refreshToken) {
      return res
        .status(400)
        .json(ApiResponse.error("Refresh token is required"));
    }

    if (typeof refreshToken !== "string") {
      return res.status(400).json(ApiResponse.error("Invalid token format"));
    }

    try {
      // Verify the refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as JwtPayload;

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json(ApiResponse.error("User not found"));
      }

      const { accessToken, refreshToken: newRefreshToken } =
        generateTokens(user);

      res.json({
        id: user.id,
        username: user.username,
        emailAddress: user.emailAddress,
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error("Refresh token expired:", error);
        return res
          .status(401)
          .json(
            ApiResponse.error("Refresh token has expired. Please log in again.")
          );
      }

      console.error("Token verification error:", error);
      return res
        .status(400)
        .json(ApiResponse.error("Token verification error"));
    }
  })
);

/**
 * Generates access and refresh tokens for a user
 * @param user - User model instance to generate tokens for
 * @returns Object containing access and refresh tokens
 */
const generateTokens = (
  user: User
): { accessToken: string; refreshToken: string } => {
  const payload: JwtPayloadRaw = {
    id: user.id,
    emailAddress: user.emailAddress,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  return { accessToken, refreshToken };
};

export default authRouter;
