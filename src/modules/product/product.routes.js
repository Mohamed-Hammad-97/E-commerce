import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadFields, uploadSingle } from "../../utils/fileUpload.js";
import { addProduct, deleteProduct, deleteProductById, getAllProduct, getProductById, updateProduct, updateProductById } from "./controller/product.controller.js";
import { addProductSchema, deleteProductByIdSchema, getProductByIdSchema, updateProductByIdSchema, updateProductSchema } from "./product.validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";
import { allowTo } from "../auth/auth.controller.js";
const productRoutes = express.Router()

productRoutes.route("/")
    .post(protectedRoutes, allowTo("admin"), uploadFields([{ name: "imageCover", maxCount: 1 }, { name: "images", maxCount: 10 }]), validation(addProductSchema), addProduct)
    .get(getAllProduct)
    .patch(validation(updateProductSchema), updateProduct)
    .delete(deleteProduct)

productRoutes.route("/:id")
    .get(validation(getProductByIdSchema), getProductById)
    .patch(uploadFields([{ name: "imageCover", maxCount: 1 }, { name: "images", maxCount: 10 }]), validation(updateProductByIdSchema), updateProductById)
    .delete(validation(deleteProductByIdSchema), deleteProductById)


export default productRoutes