import { asyncHandler } from "../lib/utils/asyncHandler";
import type { Request, Response } from "express";

export const getRouteList = asyncHandler(
  async (req: Request, res: Response) => {
    res.json({
      message: "Welcome to the ecommerce API of 1XL",
    });
  },
);
