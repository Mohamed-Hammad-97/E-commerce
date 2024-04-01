import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import reviewModel from './../../../../db connection/models/review.model.js'


const addReview = handleError(async (req, res, next) => {

    req.body.createdBy = req.user._id
    let isReview = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if (isReview) return next(new AppError("You have already review", 409))
    let preReview = new reviewModel(req.body)
    let addedReview = await preReview.save();
    res.json({ message: "Review is added", addedReview })
})

const getAllReview = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(reviewModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    res.json({ message: "All Review", results })
})

const updateReview = handleError(async (req, res, next) => {
    let updatedReview = await reviewModel.findOneAndUpdate({ _id: req.body.id, user: req.user._id }, req.body, { new: true })
    updatedReview && res.json({ message: "Review is Updated", updatedReview })
    !updatedReview && next(new AppError("Review is Not Found", 404))
})

const deleteReview = handleError(async (req, res, next) => {
    let deletedReview = await reviewModel.findByIdAndDelete(req.body.id)
    deletedReview && res.json({ message: "Review is deleted", deletedReview })
    !deletedReview && next(new AppError("Review is Not Found", 404))
})

const getReviewById = handleError(async (req, res, next) => {
    let ReviewById = await reviewModel.findById(req.params.id)
    res.json({ message: " Review", ReviewById })
})

const updateReviewById = handleError(async (req, res, next) => {

    let updatedReview = await reviewModel.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    updatedReview && res.json({ message: "Review is Updated", updatedReview })
    !updatedReview && next(new AppError("Review is Not Found", 404))
})

const deleteReviewById = handleError(async (req, res, next) => {
    let deletedReview = await reviewModel.findByIdAndDelete(req.params.id)
    deletedReview && res.json({ message: "Review is deleted", deletedReview })
    !deletedReview && next(new AppError("Review is Not Found", 404))
})

export {
    addReview,
    getAllReview,
    getReviewById,
    updateReview,
    updateReviewById,
    deleteReview,
    deleteReviewById
}