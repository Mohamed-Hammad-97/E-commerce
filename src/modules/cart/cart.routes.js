import express from "express";
import { validation } from "../../middleware/validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";
import { applyCoupon, createCart, deleteCart, getCart, removeCartItem, updateCart } from "./controller/cart.controller.js";

const cartRoutes = express.Router()

cartRoutes.route("/")
    .post(protectedRoutes, createCart)
    .get(protectedRoutes, getCart)
    .patch(protectedRoutes, updateCart)
    .delete(deleteCart)

cartRoutes.route("/:id")
    .delete(protectedRoutes, removeCartItem)

cartRoutes.route("/code")
    .put(protectedRoutes,applyCoupon)








export default cartRoutes