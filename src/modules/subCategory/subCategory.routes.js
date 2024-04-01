import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import { addSubCategory, deleteSubCategory, deleteSubCategoryById, getAllSubCategory, getSubCategoryById, updateSubCategory, updateSubCategoryById } from "./controller/subCategory.controller.js";
import { addSubCategorySchema, deleteSubCategoryByIdSchema, getSubCategoryByIdSchema, updateSubCategoryByIdSchema, updateSubCategorySchema } from "../subCategory/subCategory.validation.js";
const SubCategoryRoutes = express.Router({mergeParams:true})

SubCategoryRoutes.route("/")
    .post(uploadSingle('image'), validation(addSubCategorySchema), addSubCategory)
    .get(getAllSubCategory)
    .patch(validation(updateSubCategorySchema), updateSubCategory)
    .delete(deleteSubCategory)

SubCategoryRoutes.route("/:id")
    .get(validation(getSubCategoryByIdSchema), getSubCategoryById)
    .patch(validation(updateSubCategoryByIdSchema), updateSubCategoryById)
    .delete(validation(deleteSubCategoryByIdSchema), deleteSubCategoryById)










export default SubCategoryRoutes