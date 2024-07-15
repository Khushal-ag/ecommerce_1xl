import type { NewUser } from "@/lib/types";
import { model, Schema } from "mongoose";

const UserSchema = new Schema({
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

export const User = model("User", UserSchema);

export type User = NewUser;
