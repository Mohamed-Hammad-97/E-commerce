import express from "express";
import { validation } from "../../middleware/validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";
import { addCoupon, deleteCoupon, deleteCouponById, getAllCoupon, getCouponById, updateCoupon, updateCouponById } from "./controller/coupon.controller.js";

const couponRoutes = express.Router()

couponRoutes.route("/")
    .post(protectedRoutes, addCoupon)
    .get(getAllCoupon)
    .patch(protectedRoutes,updateCoupon)
    .delete(deleteCoupon)

couponRoutes.route("/:id")
    .get(getCouponById)
    .patch(protectedRoutes, updateCouponById)
    .delete(deleteCouponById)










export default couponRoutes