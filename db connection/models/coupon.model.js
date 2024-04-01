import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    discount: {
        type: Number,
        min: 0,
        required: [true, "coupon discount is required"]
    },
    expired: {
        type: Date,
        required: true
    },
    creadedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const couponModel = mongoose.model("Coupon", couponSchema)
export default couponModel