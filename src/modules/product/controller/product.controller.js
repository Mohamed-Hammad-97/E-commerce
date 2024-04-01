import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import productModel from './../../../../db connection/models/product.model.js'
import slugify from 'slugify'



const addProduct = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(ele => ele.filename)
    let preProduct = new productModel(req.body)
    let addedProduct = await preProduct.save();
    res.json({ message: "Product is added", addedProduct })
})

const getAllProduct = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(productModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    res.json({ message: "All Products", page: apiFeature.page, results })
})

const updateProduct = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map(ele => ele.filename)
    let updatedProduct = await productModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
    updatedProduct && res.json({ message: "Product is Updated", updatedProduct })
    !updatedProduct && next(new AppError("Product is Not Found", 404))
})

const deleteProduct = handleError(async (req, res, next) => {
    let deletedProduct = await productModel.findByIdAndDelete(req.body.id)
    deletedProduct && res.json({ message: "Product is deleted", deletedProduct })
    !deletedProduct && next(new AppError("Product is Not Found", 404))
})



const getProductById = handleError(async (req, res, next) => {
    let ProductById = await productModel.findById(req.params.id)
    res.json({ message: " Product", ProductById })
})

const updateProductById = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map(ele => ele.filename)
    let updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedProduct && res.json({ message: "Product is Updated", updatedProduct })
    !updatedProduct && next(new AppError("Product is Not Found", 404))
})

const deleteProductById = handleError(async (req, res, next) => {
    let deletedProduct = await productModel.findByIdAndDelete(req.params.id)
    deletedProduct && res.json({ message: "Product is deleted", deletedProduct })
    !deletedProduct && next(new AppError("Product is Not Found", 404))
})

export {
    addProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    updateProductById,
    deleteProduct,
    deleteProductById
}