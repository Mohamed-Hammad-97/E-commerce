import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import brandModel from './../../../../db connection/models/brand.model.js'
import slugify from 'slugify'



const addBrand = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.logo = req.file.filename
    let preBrand = new brandModel(req.body)
    let addedBrand = await preBrand.save();
    res.json({ message: "Brand is added", addedBrand })
})

const getAllBrand = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(brandModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    res.json({ message: "All Brand", results })
})

const updateBrand = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    if (req.file) req.body.logo = req.file.filename
    let updatedBrand = await brandModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
    updatedBrand && res.json({ message: "Brand is Updated", updatedBrand })
    !updatedBrand && next(new AppError("Brand is Not Found", 404))
})

const deleteBrand = handleError(async (req, res, next) => {
    let deletedBrand = await brandModel.findByIdAndDelete(req.body.id)
    deletedBrand && res.json({ message: "Brand is deleted", deletedBrand })
    !deletedBrand && next(new AppError("Brand is Not Found", 404))
})

const getBrandById = handleError(async (req, res, next) => {
    let BrandById = await brandModel.findById(req.params.id)
    res.json({ message: " Brand", BrandById })
})

const updateBrandById = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    if (req.file) req.body.logo = req.file.filename
    let updatedBrand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedBrand && res.json({ message: "Brand is Updated", updatedBrand })
    !updatedBrand && next(new AppError("Brand is Not Found", 404))
})

const deleteBrandById = handleError(async (req, res, next) => {
    let deletedBrand = await brandModel.findByIdAndDelete(req.params.id)
    deletedBrand && res.json({ message: "Brand is deleted", deletedBrand })
    !deletedBrand && next(new AppError("Brand is Not Found", 404))
})

export {
    addBrand,
    getAllBrand,
    getBrandById,
    updateBrand,
    updateBrandById,
    deleteBrand,
    deleteBrandById
}