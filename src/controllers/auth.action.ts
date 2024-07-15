import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";
import { AppError } from "@/lib/utils/appError";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { connectToDatabase } from "@/lib/config/db";
import { User } from "@/models/user.model";
env.config();

export const CreateUser = asyncHandler(async (req, res) => {
  await connectToDatabase();
  const user = await User.findOne({}).where("email").equals(req.body.email);

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
  res.status(201).json({ message: "User created successfully", data: newUser });
});

export const LoginUser = asyncHandler(async (req, res, next) => {
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
    expiresIn: "7d",
  });
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
  };
  res
    .cookie("access_token", token, cookieOptions)
    .status(200)
    .json({ message: "Login successful", data: user, token: token });
});
