import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  pName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
});

export const Product = model("Product", ProductSchema);
