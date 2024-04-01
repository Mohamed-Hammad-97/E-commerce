import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [3, "title is to short"],
        maxLength: [30, "title is to long"],
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        minLength: [3, "Description is to short"],
        maxLength: [300, "Description is to long"],
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    imageCover: {
        type: String
    },
    images: {
        type: [String]
    },
    rateAverage: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory"
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

productSchema.post('init', function (doc) {
    doc.imageCover = process.env.BASEURL + "uploads/" + doc.imageCover;
    if (doc.images) doc.images = doc.images.map(ele => process.env.BASEURL + "uploads/" + ele);
})

productSchema.virtual("myReview", {
    ref: "Review",
    localField: "_id",
    foreignField: "product"
})

productSchema.pre(/^find/, function () {
    this.populate("myReview")
})

const productModel = mongoose.model("Product", productSchema)
export default productModel