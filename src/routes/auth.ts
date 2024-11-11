import { User } from "@/models/User";
import { RouterWithAsyncHandler } from "@/utils";
import { ApiResponse } from "@/utils/responseWrapper";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const authRouter = RouterWithAsyncHandler();

// Login route
authRouter.post("/login", async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;

  // Find user
  const user = await User.findOne({ where: { emailAddress } });
  if (!user) {
    res.status(401).json(ApiResponse.error("Invalid credentials"));
    return;
  }

  // Check password
  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!isValidPassword) {
    res.status(401).json(ApiResponse.error("Invalid credentials"));
    return;
  }

  const { id, username } = user;

  res.json({ id, username, emailAddress });
});

export default authRouter;
