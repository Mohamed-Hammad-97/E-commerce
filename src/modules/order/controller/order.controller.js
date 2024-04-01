import cartModel from '../../../../db connection/models/cart.model.js'
import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import orderModel from '../../../../db connection/models/order.model.js'
import productModel from '../../../../db connection/models/product.model.js'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.ONLINE_SECRET_KEY);

const createCacheOrder = handleError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError("Cart Is Not Found", 404))
    
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    let order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress
    })
    if (order) {
        let options = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }))
        await productModel.bulkWrite(options)
        await order.save()
    } else {
        return next(new AppError("Error", 409))
    }

    await cartModel.findByIdAndDelete(cart._id)
    res.json({ message: "Done", order })

})

const getOrder = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(orderModel.find().populate("cartItems.product"), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    results && res.json({ message: "Order", results })
    !results && next(new AppError("Order is Not Found", 404))
})

const onlinePayment = handleError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError("Cart Is Not Found", 404))
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.userName
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://route-comm.netlify.app/#/",
        cancel_url: "https://route-comm.netlify.app/#/cart",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    });
    res.json({ message: "Done", session })
})

export {
    createCacheOrder,
    getOrder,
    onlinePayment
}