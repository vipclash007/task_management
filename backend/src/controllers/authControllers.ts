import { Request, Response } from "express";
import {prisma} from "../prisma-client";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = signToken(user.id);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
    console.log(error);
  }
};
