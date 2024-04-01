import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    cartItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    totalPrice: Number,
    discount: Number,
    totalOrderAfterDiscount: Number,
    paymentMethod: {
        type: String,
        enums: ["cache", "credit"],
        default: "cache"
    },
    shippingAddress: {
        city: String,
        street: String
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const orderModel = mongoose.model("Order", orderSchema)
export default orderModel