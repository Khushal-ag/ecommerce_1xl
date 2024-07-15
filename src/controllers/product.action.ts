import { products } from "@/data";
import { connectToDatabase } from "@/lib/config/db";
import { AppError } from "@/lib/utils/appError";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { Category } from "@/models/category.model";
import { Product } from "@/models/product.model";
import type { Request, Response, NextFunction } from "express";

export const uploadProducts = asyncHandler(
  async (req: Request, res: Response) => {
    await connectToDatabase();
    await Product.deleteMany({});
    const result = await Product.insertMany(products);
    if (!result) {
      throw new AppError("Product upload failed", 500);
    }
    res
      .status(201)
      .json({ message: "Data uploaded successfully", data: result });
  },
);

export const listProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();
    res.status(200).json({ data: products });
  },
);

export const fetchProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({ data: product });
  },
);

export const addProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pName, description, price, category, stock } = req.body;

    const categoryData = await Category.findOne({ slug: category });

    if (!categoryData) {
      return next(new AppError("Category not found", 404));
    }

    const newProduct = await Product.create({
      pName,
      description,
      price,
      category,
      stock,
    });

    res.status(201).json({ data: newProduct });
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({ message: "Product deleted successfully" });
  },
);

export const filterProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category, search } = req.query;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { pName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query);

    res.status(200).json({ data: products });
  },
);
