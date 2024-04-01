import userModel from '../../../../db connection/models/user.model.js'
import { handleError } from '../../../middleware/handleError.js'
import { AppError } from '../../../utils/AppError.js'


const addToWishList = handleError(async (req, res, next) => {
    let { product } = req.body
    let updatedWishList = await userModel.findOneAndUpdate(req.user._id, {
        $addToSet: { wishList: product }
    }, { new: true })
    updatedWishList && res.json({ message: "WishList is Updated", updatedWishList })
    !updatedWishList && next(new AppError("WishList is Not Found", 404))
})

const removeFromWhishList = handleError(async (req, res, next) => {
    let { product } = req.body
    let updatedWishList = await userModel.findOneAndUpdate(req.user._id, {
        $pull: { wishList: product }
    }, { new: true })
    updatedWishList && res.json({ message: "WishList is Updated", updatedWishList })
    !updatedWishList && next(new AppError("WishList is Not Found", 404))
})

const getAllWishList = handleError(async (req, res, next) => {
    let allWhishList = await userModel.findOne({_id:req.user._id})
    allWhishList && res.json({ message: "WishList is Updated", allWhishList:allWhishList.wishList })
    !allWhishList && next(new AppError("WishList is Not Found", 404))
})


export {
    addToWishList,
    removeFromWhishList,
    getAllWishList
}