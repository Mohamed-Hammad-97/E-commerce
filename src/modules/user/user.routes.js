import express from "express";
import { addUser, changePasswordById, deleteUser, deleteUserById, getAllUser, getUserById, updateUser, updateUserById } from "./controller/user.controller.js";
const userRoutes = express.Router()

userRoutes.route("/")
    .post(addUser)
    .get(getAllUser)
    .patch(updateUser)
    .delete(deleteUser)

userRoutes.route("/:id")
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

userRoutes.route("/changePassword/:id")
    .patch(changePasswordById)

export default userRoutes