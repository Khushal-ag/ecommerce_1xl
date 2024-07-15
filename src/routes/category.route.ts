import {
  addCategory,
  listCategories,
  uploadCategories,
} from "@/controllers/category.action";
import { isAdmin, isAuthenticated } from "@/lib/utils/middleware";
import express from "express";
export const category = express.Router();

category.route("/").get(isAuthenticated, listCategories);
category.route("/upload").post(isAuthenticated, isAdmin, uploadCategories);
category.route("/add").post(isAuthenticated, isAdmin, addCategory);
