import { asyncHandler } from "../lib/utils/asyncHandler";
import type { Request, Response } from "express";

export const getRouteList = asyncHandler(
  async (req: Request, res: Response) => {
    res.json({
      message: "Welcome to the ecommerce API of 1XL",
      routes: {
        "Auth routes ( '/auth' )": {
          "Register or Signup": {
            POST: "/auth/register or /auth/signup",
            body: {
              name: "string",
              email: "string",
              password: "string",
              admin: "boolean",
            },
          },
          "login or signin": {
            POST: "/auth/login or /auth/signin",
            body: {
              email: "string",
              password: "string",
            },
          },
        },
        "Category routes ( '/category' )": {
          "Get all categories": {
            GET: "/category/",
          },
          "Add category (Admin only)": {
            POST: "/category/add",
            body: {
              title: "string",
              slug: "string",
            },
          },
          "Upload category (Admin only)": {
            POST: "/category/upload",
          },
        },
        "Product routes ( '/products' )": {
          "Get all products": {
            GET: "/products/",
          },
          "Get product by id": {
            GET: "/products/product/:productId",
          },
          "Add product (Admin only)": {
            POST: "/products/add",
            body: {
              pName: "string",
              description: "string",
              price: "number",
              category: "string",
              stock: "boolean",
            },
          },
          "Update product (Admin only)": {
            PUT: "/products/update/:productId",
            body: {
              pName: "string",
              description: "string",
              price: "number",
              category: "string",
              stock: "boolean",
            },
          },
          "Upload product (Admin only)": {
            POST: "/product/upload",
          },
          "Delete product (Admin only)": {
            DELETE: "/products/:productId",
          },
          "Filter products": {
            GET: "/products/filter/?category=string&search=string",
            query: {
              category: "string",
              search: "string",
            },
          },
        },
        "Cart routes ( '/cart' )": {
          "Get User cart": {
            GET: "/cart/",
          },
          "Add Product to cart": {
            POST: "/cart/add",
            body: {
              productId: "string",
              qty: "number",
            },
          },
          "Update cart items": {
            PUT: "/cart/update",
            body: {
              productId: "string",
              qty: "number",
            },
          },
          "Checkout cart": {
            GET: "/cart/checkout",
          },
        },
        "Order routes ( '/order' )": {
          "Get all orders (Admin only)": {
            GET: "/order/all",
          },
          "Get user orders": {
            GET: "/order/get",
          },
          "Update status (Admin only)": {
            PUT: "/order/update-status",
            body: {
              orderId: "string",
              status: "string",
            },
          },
        },
      },
    });
  },
);
