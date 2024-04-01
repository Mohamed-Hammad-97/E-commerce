import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
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
    nodemoimage: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref:"Category"
    },
    creadedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

subCategorySchema.post('init', function (doc) {
    doc.image = process.env.BASEURL + "uploads/" + doc.image
})

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema)
export default subCategoryModel