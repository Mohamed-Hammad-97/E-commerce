import userModel from '../../../../db connection/models/user.model.js'
import { handleError } from '../../../middleware/handleError.js'
import { AppError } from '../../../utils/AppError.js'




const addAddress = handleError(async (req, res, next) => {
    let updatedAddress = await userModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { address: req.body }
    }, { new: true })
    updatedAddress && res.json({ message: "Address is Added", updatedAddress })
    !updatedAddress && next(new AppError("wrong Address", 404))
})

const removeAddress = handleError(async (req, res, next) => {
    let removedAddress = await userModel.findOneAndUpdate(req.user._id, {
        $pull: { address: req.body }
    }, { new: true })
    removedAddress && res.json({ message: "WishList is Updated", removedAddress })
    !removedAddress && next(new AppError("WishList is Not Found", 404))
})

const getAllAddress = handleError(async (req, res, next) => {
    let allAddress = await userModel.findOne({ _id: req.user._id })
    allAddress && res.json({ message: "All Address", allAddress: allAddress.address })
    !allAddress && next(new AppError("Address is Not Found", 404))
})


export {
    addAddress,
    removeAddress,
    getAllAddress
}