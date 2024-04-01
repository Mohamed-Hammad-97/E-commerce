import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import { addBrandSchema, deleteBrandByIdSchema, getBrandByIdSchema, updateBrandByIdSchema, updateBrandSchema } from "../brand/brand.validation.js";
import { addBrand, deleteBrand, deleteBrandById, getAllBrand, getBrandById, updateBrand, updateBrandById } from "./controller/brand.controller.js";
const BrandRoutes = express.Router()

BrandRoutes.route("/")
    .post(uploadSingle('image'), validation(addBrandSchema), addBrand)
    .get(getAllBrand)
    .patch(validation(updateBrandSchema), updateBrand)
    .delete(deleteBrand)

BrandRoutes.route("/:id")
    .get(validation(getBrandByIdSchema), getBrandById)
    .patch(validation(updateBrandByIdSchema), updateBrandById)
    .delete(validation(deleteBrandByIdSchema), deleteBrandById)










export default BrandRoutes