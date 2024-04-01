import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [3, "userName is to short"],
        maxLength: [30, "userName is to long"],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: [3, "Password is to short"],
        maxLength: [14, "Password is to long"],
        required: true
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    changePasswordAt: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
    address: [{
        city: String,
        street: String,
        phone: String,
    }]

}, {
    timestamps: true
})

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_ROUNDS))
})

userSchema.pre("findOneAndUpdate", function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, Number(process.env.SALT_ROUNDS))
})

const userModel = mongoose.model("User", userSchema)
export default userModel