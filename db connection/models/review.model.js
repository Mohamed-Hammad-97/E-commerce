import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

reviewSchema.pre(/^find/, function () {
    this.populate('createdBy', 'userName')
})
const reviewModel = mongoose.model("Review", reviewSchema)
export default reviewModel