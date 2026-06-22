import { Router, Request, Response } from "express";
import { UserModel } from "../models/user";
import type { UserPublic } from "../types/user";

const router = Router();

// POST /register — register a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate username: 3-50 characters
    if (!username || username.length < 3 || username.length > 50) {
      res.status(400).json({ error: "Username must be 3-50 characters" });
      return;
    }

    // Validate password: at least 6 characters
    if (!password || password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    // Check if username already exists
    const existing = await UserModel.findByUsername(username);
    if (existing) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }

    // Create user (password is hashed inside the model)
    const user = await UserModel.create({ username, password });

    res.status(201).json({
      message: "User registered",
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
