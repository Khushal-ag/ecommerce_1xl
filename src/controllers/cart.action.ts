// @ts-nocheck
import { Cart } from "../models/cart.model";
import { asyncHandler } from "../lib/utils/asyncHandler";
import type { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const cart = await Cart.findOne({ user: userId }).populate("items.productId");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ data: cart });
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId, qty } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) =>
      item.productId?.equals(productId),
    );
    if (itemIndex > -1) {
      // Item already exists in the cart, update quantity and price
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += product.price * qty;
    } else {
      // Item does not exist in the cart, add new item
      cart.items.push({
        productId: product._id,
        qty,
        price: product.price * qty,
        title: product.pName,
        productCode: product._id.toString(),
      });
    }
  } else {
    // No cart exists for the user, create a new cart
    cart = new Cart({
      user: userId,
      items: [
        {
          productId: product._id,
          qty,
          price: product.price * qty,
          title: product.pName,
          productCode: product._id.toString(),
        },
      ],
      totalQty: 0,
      totalCost: 0,
    });
  }

  cart.totalQty += qty;
  cart.totalCost += product.price * qty;

  // Save cart changes
  await cart.save();

  res.status(200).json({ message: "Item added to cart", data: cart });
});
