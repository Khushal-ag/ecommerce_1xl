import { categories } from "@/data";
import { connectToDatabase } from "@/lib/config/db";
import { AppError } from "@/lib/utils/appError";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { Category } from "@/models/category.model";
import type { Request, Response, NextFunction } from "express";

export const uploadCategories = asyncHandler(
  async (req: Request, res: Response) => {
    await connectToDatabase();
    await Category.deleteMany({});
    const result = await Category.insertMany(categories);
    if (!result) {
      throw new AppError("Categories upload failed", 500);
    }
    res
      .status(201)
      .json({ message: "Data uploaded successfully", data: result });
  },
);

export const listCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  },
);

export const addCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, slug } = req.body;
    const newCategory = await Category.create({ title, slug });

    res.status(201).json({ data: newCategory });
  },
);
