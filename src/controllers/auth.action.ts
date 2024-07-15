import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/lib/utils/appError";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { connectToDatabase } from "@/lib/config/db";
import { Admin, User } from "@/models/user.model";
env.config();

export const RegisterUser = asyncHandler(
  async (req: Request, res: Response) => {
    await connectToDatabase();

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      admin: req.body.admin || false,
    });

    if (!newUser) {
      res.status(500).json({ message: "User creation failed" });
      return;
    }

    // Check if the new user is an admin and create an entry in the Admin table
    if (newUser.admin) {
      const adminEntry = await Admin.create({
        userId: newUser._id,
        // Add any other fields related to the admin here
      });

      if (!adminEntry) {
        res.status(500).json({ message: "Admin entry creation failed" });
        return;
      }
    }

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  },
);

export const LoginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await connectToDatabase();
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      next(new AppError("User not found", 404));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      next(new AppError("Incorrect email or password", 401));
      return;
    }

    // signin using jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
    };
    res
      .cookie("access_token", token, cookieOptions)
      .status(200)
      .json({ message: "Login successful", data: user, token: token });
  },
);
