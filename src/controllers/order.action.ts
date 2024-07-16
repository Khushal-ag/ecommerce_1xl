// @ts-nocheck
import { asyncHandler } from "../lib/utils/asyncHandler";
import { Order } from "../models/order.model";
import type { Request, Response } from "express";

export const fetchOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const orders = await Order.find({ user: userId });

  if (!orders.length) {
    return res.status(404).json({ message: "No orders found" });
  }

  res.status(200).json({ data: orders });
});

export const fetchAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find().populate("user", "name email");

    res.status(200).json({ data: orders });
  },
);

// Update order status (admin only)
export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", data: order });
  },
);
