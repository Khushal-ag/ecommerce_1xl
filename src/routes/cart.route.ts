import {
  addToCart,
  checkoutCart,
  getCart,
  updateCart,
} from "../controllers/cart.action";
import { isAuthenticated } from "../lib/utils/middleware";
import express from "express";
export const cart = express.Router();

cart.route("/").get(isAuthenticated, getCart);
cart.route("/add").post(isAuthenticated, addToCart);
cart.route("/update").put(isAuthenticated, updateCart);
cart.route("/checkout").get(isAuthenticated, checkoutCart);
