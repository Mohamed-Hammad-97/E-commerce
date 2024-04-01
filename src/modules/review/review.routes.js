import express from "express";
import { validation } from "../../middleware/validation.js";
import { addReviewSchema, deleteReviewByIdSchema, getReviewByIdSchema, updateReviewByIdSchema, updateReviewSchema } from "../review/review.validation.js";
import { addReview, deleteReview, deleteReviewById, getAllReview, getReviewById, updateReview, updateReviewById } from "./controller/review.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const reviewRoutes = express.Router()

reviewRoutes.route("/")
    .post(protectedRoutes, validation(addReviewSchema), addReview)
    .get(getAllReview)
    .patch(protectedRoutes, validation(updateReviewSchema), updateReview)
    .delete(deleteReview)

reviewRoutes.route("/:id")
    .get(validation(getReviewByIdSchema), getReviewById)
    .patch(protectedRoutes, validation(updateReviewByIdSchema), updateReviewById)
    .delete(validation(deleteReviewByIdSchema), deleteReviewById)










export default reviewRoutes