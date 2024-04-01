import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import subCategoryModel from './../../../../db connection/models/subCategory.model.js'
import slugify from 'slugify'



const addSubCategory = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.image = req.file.filename
    let preSubCategory = new subCategoryModel(req.body)
    let addedSubCategory = await preSubCategory.save();
    res.json({ message: "Category is added", addedSubCategory })
})

const getAllSubCategory = handleError(async (req, res, next) => {
    let filterObject = {}
    if (req.params.category) {
        filterObject.category = req.params.category
    }
    let apiFeature = new ApiFeatures(subCategoryModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    let SubCategory = await subCategoryModel.find(filterObject)
    res.json({ message: "All SubCategory", results, SubCategory })
})

const updateSubCategory = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let updatedSubCategory = await subCategoryModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
    updatedSubCategory && res.json({ message: "SubCategory is Updated", updatedSubCategory })
    !updatedSubCategory && next(new AppError("SubCategory is Not Found", 404))
})

const deleteSubCategory = handleError(async (req, res, next) => {
    let deletedSubCategory = await subCategoryModel.findByIdAndDelete(req.body.id)
    deletedSubCategory && res.json({ message: "SubCategory is deleted", deletedSubCategory })
    !deletedSubCategory && next(new AppError("SubCategory is Not Found", 404))
})

const getSubCategoryById = handleError(async (req, res, next) => {
    let SubCategoriesById = await subCategoryModel.findById(req.params.id)
    res.json({ message: " SubCategory", SubCategoriesById })
})

const updateSubCategoryById = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let updatedSubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedSubCategory && res.json({ message: "SubCategory is Updated", updatedSubCategory })
    !updatedSubCategory && next(new AppError("SubCategory is Not Found", 404))
})

const deleteSubCategoryById = handleError(async (req, res, next) => {
    let deletedSubCategory = await subCategoryModel.findByIdAndDelete(req.params.id)
    deletedSubCategory && res.json({ message: "SubCategory is deleted", deletedSubCategory })
    !deletedSubCategory && next(new AppError("SubCategory is Not Found", 404))
})

export {
    addSubCategory,
    getAllSubCategory,
    getSubCategoryById,
    updateSubCategory,
    updateSubCategoryById,
    deleteSubCategory,
    deleteSubCategoryById
}