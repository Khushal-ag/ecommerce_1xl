import { getRouteList } from "../controllers/home.action";
import express from "express";
export const home = express.Router();

home.route("/").get(getRouteList);
