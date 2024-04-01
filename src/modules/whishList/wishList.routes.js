import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import { addToWishList, getAllWishList, removeFromWhishList } from "./controller/whishList.controller.js";

const wishListRoutes = express.Router()

wishListRoutes.route("/")
    .patch(protectedRoutes, addToWishList)
    .delete(protectedRoutes, removeFromWhishList)
    .get(protectedRoutes, getAllWishList)

export default wishListRoutes