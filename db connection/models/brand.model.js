import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
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
    logo: {
        type: String
    },
    creadedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

brandSchema.post('init', function (doc) {
    doc.logo = process.env.BASEURL + "uploads/" + doc.logo
})

const brandModel = mongoose.model("Brand", brandSchema)
export default brandModel