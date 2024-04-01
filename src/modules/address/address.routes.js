import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getAllAddress, removeAddress } from "./controller/address.controller.js";

const addressRoutes = express.Router()

addressRoutes.route("/")
    .patch(protectedRoutes, addAddress)
    .delete(protectedRoutes,removeAddress)
    .get(protectedRoutes ,getAllAddress)

export default addressRoutes