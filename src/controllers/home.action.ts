import { asyncHandler } from "@/lib/utils/asyncHandler";

export const getRouteList = asyncHandler(async (req, res) => {
  res.json({
    message: "Welcome to the ecommerce API of 1XL",
  });
});
