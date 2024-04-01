import cartModel from '../../../../db connection/models/cart.model.js'
import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'
import productModel from '../../../../db connection/models/product.model.js'
import couponModel from '../../../../db connection/models/coupon.model.js'

function calcPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach((ele) => {
        totalPrice += ele.quantity * ele.price
    })
    cart.totalPrice = totalPrice
}

const createCart = handleError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new AppError("product is Not Found", 404))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({ user: req.user._id })
    if (!isCartExist) {
        let cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        calcPrice(cart)
        let addedCart = await cart.save();
        res.json({ message: "cart is added", addedCart })
    }

    let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
    if (item) {
        item.quantity += 1
    } else {
        isCartExist.cartItems.push(req.body)
    }

    calcPrice(isCartExist)
    if (isCartExist.discount) isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100

    let cart = await isCartExist.save()
    res.json({ message: "cart is added", cart })
    return next(new AppError("You have already Cart", 409))

})

const getCart = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(cartModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    results && res.json({ message: "Cart", results })
    !results && next(new AppError("Cart is Not Found", 404))
})

const removeCartItem = handleError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    calcPrice(cart)
    res.json({ message: "Product is Removed", cart })
})

const updateCart = handleError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new AppError("product is Not Found", 404))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({ user: req.user._id })

    let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
    !item && next(new AppError("Item is Not Found", 404))
    if (item) {
        item.quantity = req.body.quantity
    }

    calcPrice(isCartExist)
    let cart = await isCartExist.save()
    res.json({ message: "cart is added", cart })
    return next(new AppError("You have already Cart", 409))
})

const deleteCart = handleError(async (req, res, next) => {
    let deletedCart = await cartModel.findByIdAndDelete(req.body.id)
    deletedCart && res.json({ message: "Cart is deleted", deletedCart })
    !deletedCart && next(new AppError("Cart is Not Found", 404))
})

const getCartById = handleError(async (req, res, next) => {
    let CartById = await cartModel.findById(req.params.id)
    res.json({ message: " Cart", CartById })
})

const applyCoupon = handleError(async (req, res, next) => {
    let code = await couponModel.findOne({ code: req.body.code })
    let cart = await cartModel.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100
    cart.discount = code.discount
    await cart.save()
    res.json({ message: "Done", cart })
})



export {
    createCart,
    getCart,
    removeCartItem,
    getCartById,
    updateCart,
    deleteCart,
    applyCoupon
}