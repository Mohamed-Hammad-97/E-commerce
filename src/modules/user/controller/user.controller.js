import userModel from '../../../../db connection/models/user.model.js'
import { handleError } from '../../../middleware/handleError.js'
import ApiFeatures from '../../../utils/APIFeatures.js'
import { AppError } from '../../../utils/AppError.js'



const addUser = handleError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError("This email is already exist", 409))
    let preUser = new userModel(req.body)
    let addedUser = await preUser.save();
    res.json({ message: "User is added", addedUser })
})

const getAllUser = handleError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(userModel.find(), req.query).pagination().sort().search().filter().fields()
    let results = await apiFeature.mongooseQuery
    res.json({ message: "All User", results })
})

const updateUser = handleError(async (req, res, next) => {
    let updatedUser = await userModel.findByIdAndUpdate(req.body.id, req.body, { new: true })
    updatedUser && res.json({ message: "User is Updated", updatedUser })
    !updatedUser && next(new AppError("User is Not Found", 404))
})

const deleteUser = handleError(async (req, res, next) => {
    let deletedUser = await userModel.findByIdAndDelete(req.body.id)
    deletedUser && res.json({ message: "User is deleted", deletedUser })
    !deletedUser && next(new AppError("User is Not Found", 404))
})

const getUserById = handleError(async (req, res, next) => {
    let UserById = await userModel.findById(req.params.id)
    res.json({ message: " User", UserById })
})

const updateUserById = handleError(async (req, res, next) => {
    let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedUser && res.json({ message: "User is Updated", updatedUser })
    !updatedUser && next(new AppError("User is Not Found", 404))
})

const deleteUserById = handleError(async (req, res, next) => {
    let deletedUser = await userModel.findByIdAndDelete(req.params.id)
    deletedUser && res.json({ message: "User is deleted", deletedUser })
    !deletedUser && next(new AppError("User is Not Found", 404))
})

const changePasswordById = handleError(async (req, res, next) => {
    req.body.changePasswordAt = Date.now()
    console.log(req.body.changePasswordAt);
    let updatedPassword = await userModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    updatedPassword && res.json({ message: "Password is Updated", updatedPassword })
    !updatedPassword && next(new AppError("Password is Not Found", 404))
})

export {
    addUser,
    getAllUser,
    getUserById,
    updateUser,
    updateUserById,
    deleteUser,
    deleteUserById,
    changePasswordById
}