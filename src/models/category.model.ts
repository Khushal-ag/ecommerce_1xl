import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Category = model("Category", CategorySchema);
