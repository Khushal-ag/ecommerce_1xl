import { UserDocument } from "../../../models/user.model"; // Adjust the import path as necessary

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument; // Adjust the type according to your User model
  }
}
