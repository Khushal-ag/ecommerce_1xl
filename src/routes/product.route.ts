import {
  addProduct,
  deleteProduct,
  fetchProduct,
  filterProducts,
  listProducts,
  uploadProducts,
} from "@/controllers/product.action";
import { isAdmin, isAuthenticated } from "@/lib/utils/middleware";
import express from "express";
export const product = express.Router();

product.route("/").get(isAuthenticated, listProducts);
product.route("/:productId").get(isAuthenticated, fetchProduct);
product.route("/upload").post(isAuthenticated, isAdmin, uploadProducts);
product.route("/add").post(isAuthenticated, isAdmin, addProduct);
product.route("/:productId").delete(isAuthenticated, isAdmin, deleteProduct);
product.route("/filter").get(isAuthenticated, filterProducts);
