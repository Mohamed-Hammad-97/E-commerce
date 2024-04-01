import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import categoryModel from './../../../../db connection/models/category.model.js'
import slugify from 'slugify'



const addCategory = handleError(async (req, res,next) => {
    req.body.slug = slugify(req.body.title)
    req.body.image = req.file.filename
    let preCategory = new categoryModel(req.body)
    let addedCategory = await preCategory.save();
    res.json({ message: "Category is added", addedCategory })
})

const getCategory = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(categoryModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    res.json({ message: "All Categories", results })
})

const updateCategory = handleError(async (req, res,next) => {
    req.body.slug = slugify(req.body.title)
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
    updatedCategory && res.json({ message: "Category is Updated", updatedCategory })
    !updatedCategory && next(new AppError("Category is Not Found", 404))
})

const deleteCategory = handleError(async (req, res,next) => {
    let deletedCategory = await categoryModel.findByIdAndDelete(req.body.id)
    deletedCategory && res.json({ message: "Category is deleted", deletedCategory })
    !deletedCategory && next(new AppError("Category is Not Found", 404))
})

const getCategoryById = handleError(async (req, res,next) => {
    let categoriesById = await categoryModel.findById(req.params.id)
    res.json({ message: "All Categories", categoriesById })
})

const updateCategoryById = handleError(async (req, res,next) => {
    req.body.slug = slugify(req.body.title)
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedCategory && res.json({ message: "Category is Updated", updatedCategory })
    !updatedCategory && next(new AppError("Category is Not Found", 404))
})

const deleteCategoryById = handleError(async (req, res,next) => {
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id)
    deletedCategory && res.json({ message: "Category is deleted", deletedCategory })
    !deletedCategory && next(new AppError("Category is Not Found", 404))
})

export {
    addCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    updateCategoryById,
    deleteCategory,
    deleteCategoryById
}