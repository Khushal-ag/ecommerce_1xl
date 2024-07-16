import {
  fetchAllOrders,
  fetchOrders,
  updateOrderStatus,
} from "../controllers/order.action";
import { isAdmin, isAuthenticated } from "../lib/utils/middleware";
import express from "express";
export const order = express.Router();

order.route("/get").get(isAuthenticated, fetchOrders);
order.route("/all").get(isAuthenticated, isAdmin, fetchAllOrders);
order.route("/update-status").put(isAuthenticated, isAdmin, updateOrderStatus);
