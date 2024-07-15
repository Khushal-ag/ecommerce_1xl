import { LoginUser, RegisterUser } from "@/controllers/auth.action";
import express from "express";
export const auth = express.Router();

auth
  .route(["/signup", "/register"])
  .get((req, res) => {
    res.send("Register or SignUp here! REQUEST : POST");
  })
  .post(RegisterUser);

auth
  .route(["/signin", "/login"])
  .get((req, res) => {
    res.send("Login or SignIn here! REQUEST : POST");
  })
  .post(LoginUser);
