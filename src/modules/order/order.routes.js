import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import { createCacheOrder, createOnlineOrder, getOrder, onlinePayment } from "./controller/order.controller.js";

const orderRoutes = express.Router()

orderRoutes.route("/")
    .get(protectedRoutes, getOrder)


orderRoutes.route("/:id")
    .post(protectedRoutes, createCacheOrder)

orderRoutes.route("/checkout/:id")
    .post(protectedRoutes, onlinePayment)

orderRoutes.post('/webhook', express.raw({ type: 'application/json' }), createOnlineOrder)





export default orderRoutes