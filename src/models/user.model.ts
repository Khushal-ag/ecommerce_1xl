import type { UserDocument } from "../lib/types";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const AdminSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const User = model("User", UserSchema);
export const Admin = model("Admin", AdminSchema);
