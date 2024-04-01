import couponModel from '../../../../db connection/models/coupon.model.js'
import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'


const addCoupon = handleError(async (req, res, next) => {

    let Coupon = new couponModel(req.body)
    let addedCoupon = await Coupon.save();
    res.json({ message: "Coupon is added", addedCoupon })
})

const getAllCoupon = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(couponModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    res.json({ message: "All Coupon", results })
})

const updateCoupon = handleError(async (req, res, next) => {
    let updatedCoupon = await couponModel.findOneAndUpdate({ _id: req.body.id}, req.body, { new: true })
    updatedCoupon && res.json({ message: "Coupon is Updated", updatedCoupon })
    !updatedCoupon && next(new AppError("Coupon is Not Found", 404))
})

const deleteCoupon = handleError(async (req, res, next) => {
    let deletedCoupon = await couponModel.findByIdAndDelete(req.body.id)
    deletedCoupon && res.json({ message: "Coupon is deleted", deletedCoupon })
    !deletedCoupon && next(new AppError("Coupon is Not Found", 404))
})

const getCouponById = handleError(async (req, res, next) => {
    let CouponById = await couponModel.findById(req.params.id)
    res.json({ message: " Coupon", CouponById })
})

const updateCouponById = handleError(async (req, res, next) => {

    let updatedCoupon = await couponModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    updatedCoupon && res.json({ message: "Coupon is Updated", updatedCoupon })
    !updatedCoupon && next(new AppError("Coupon is Not Found", 404))
})

const deleteCouponById = handleError(async (req, res, next) => {
    let deletedCoupon = await couponModel.findByIdAndDelete(req.params.id)
    deletedCoupon && res.json({ message: "Coupon is deleted", deletedCoupon })
    !deletedCoupon && next(new AppError("Coupon is Not Found", 404))
})

export {
    addCoupon,
    getAllCoupon,
    getCouponById,
    updateCoupon,
    updateCouponById,
    deleteCoupon,
    deleteCouponById
}