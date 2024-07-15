import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";

import { home } from "@/routes/home.route";
import { auth } from "@/routes/auth.route";
import { product } from "./routes/product.route";
import { category } from "./routes/category.route";
import { errorHandler } from "./lib/utils/middleware";

env.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use("", home);
app.use("/auth", auth);
app.use("/products", product);
app.use("/category", category);

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
