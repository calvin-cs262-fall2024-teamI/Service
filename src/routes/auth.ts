import { Router, Request, Response } from "express";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

const authRouter = Router();

// Sign up route
authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { emailAddress, passwordHash, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { emailAddress } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // Create new user
    const user = await User.create({
      emailAddress: emailAddress,
      passwordHash: hashedPassword,
      username: username,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.emailAddress,
        name: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login route
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email: emailAddress, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { emailAddress } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check password
    const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.emailAddress,
        name: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default authRouter;
