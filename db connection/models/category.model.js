import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
    image: {
        type: String
    },
    creadedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});


categorySchema.post('init', function (doc) {
    doc.image = process.env.BASEURL + "uploads/" + doc.image
})


const categoryModel = mongoose.model("Category", categorySchema)
export default categoryModel