import { User } from "@/models/User";
import { JwtPayload, JwtPayloadRaw } from "@/types";
import { RouterWithAsyncHandler } from "@/utils";
import { ApiResponse } from "@/utils/responseWrapper";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const authRouter = RouterWithAsyncHandler();

// Login route
authRouter.post("/login", async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;

  // Find user
  const user = await User.findOne({ where: { emailAddress } });
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

  res.json({
    id,
    username,
    emailAddress,
    accessToken,
    refreshToken,
  });
});

authRouter.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new Error("Refresh token is required");

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!
  ) as JwtPayload;

  const user = await User.findByPk(decoded.id);
  if (!user) throw new Error("User not found");

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

  res.json({
    id: user.id,
    username: user.username,
    emailAddress: user.emailAddress,
    accessToken,
    refreshToken: newRefreshToken,
  });
});

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
