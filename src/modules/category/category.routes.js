import express from "express";
import { addCategory, deleteCategory, deleteCategoryById, getCategory, getCategoryById, updateCategory, updateCategoryById } from "./controller/category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, deleteCategoryByIdSchema, getCategoryByIdSchema, updateCategoryByIdSchema, updateCategorySchema } from "./category.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import SubCategoryRoutes from "../subCategory/subCategory.routes.js";
const categoryRoutes = express.Router()

categoryRoutes.use("/:category/subCategory", SubCategoryRoutes)


categoryRoutes.route("/")
    .post(uploadSingle('image'), validation(addCategorySchema), addCategory)
    .get(getCategory)
    .patch(validation(updateCategorySchema), updateCategory)
    .delete(deleteCategory)

categoryRoutes.route("/:id")
    .get(validation(getCategoryByIdSchema), getCategoryById)
    .patch(validation(updateCategoryByIdSchema), updateCategoryById)
    .delete(validation(deleteCategoryByIdSchema), deleteCategoryById)










export default categoryRoutes