// @ts-nocheck

import { Cart } from "../models/cart.model";
import { asyncHandler } from "../lib/utils/asyncHandler";
import type { Request, Response } from "express";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";

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

export const updateCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId, qty } = req.body;

  // Find the cart for the authenticated user
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Find the index of the item in the cart
  const itemIndex = cart.items.findIndex((item) =>
    item.productId?.equals(productId),
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  // Get the item from the cart
  const item = cart.items[itemIndex];

  // If qty is 0, remove the item from the cart
  if (qty === 0) {
    cart.totalQty -= item.qty;
    cart.totalCost -= item.price;
    cart.items.splice(itemIndex, 1);
  } else {
    // Find the product to get the price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the item's quantity and price
    cart.totalQty = cart.totalQty - item.qty + qty;
    cart.totalCost = cart.totalCost - item.price + product.price * qty;

    item.qty = qty;
    item.price = product.price * qty;
  }

  // Save the updated cart
  await cart.save();

  res.status(200).json({ message: "Cart updated", data: cart });
});

export const checkoutCart = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    // Find the cart for the authenticated user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Create a new order with the items from the cart
    const newOrder = new Order({
      user: userId,
      items: cart.items,
      totalQty: cart.totalQty,
      totalCost: cart.totalCost,
      status: "processing",
    });

    // Clear the cart
    cart.items = [];
    cart.totalQty = 0;
    cart.totalCost = 0;

    // Save the new order and the updated cart
    await newOrder.save();
    await cart.save();

    res.status(200).json({ message: "Checkout successful", data: newOrder });
  },
);
