import { Document, Schema } from "mongoose";

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
};

export type ProductType = {
  id: string;
  pName: string;
  description: string;
  price: number;
  category: string;
  stock: boolean;
};

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
};

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}
