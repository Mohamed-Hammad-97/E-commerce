import userModel from '../../../db connection/models/User.model.js'
import { handleError } from '../../middleware/handleError.js'
import { AppError } from '../../utils/AppError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signUp = handleError(async (req, res, next) => {
    let isFound = await userModel.findOne({ email: req.body.email })
    if (isFound) return next(new AppError("This Email Is Already Exist", 409))
    let user = new userModel(req.body)
    let verifyToken = jwt.sign({ id: addedUser[0]._id }, process.env.VERIFYTOKEN)
    sendEmail({ email, api: `http://localhost:3000/api/v1/user/verify/${verifyToken}` })
    await user.save()
    res.json({ message: "Done", user })
})

const signIn = handleError(async (req, res, next) => {
    let { email, password } = req.body
    let isFound = await userModel.findOne({ email })
    if (!isFound) {
        return next(new AppError("Incorrect Email", 401))
    } else {
        let match = bcrypt.compareSync(password, isFound.password)
        if (match) {
            let token = jwt.sign({ name: isFound.userName, userId: isFound._id, role: isFound.role }, process.env.SECRET_KEY)
            return res.json({ message: "Welcome", token })
        } else {
            return next(new AppError("Incorrect Password", 401))
        }
    }

})

const protectedRoutes = handleError(async (req, res, next) => {
    let { token } = req.headers
    if (!token) return next(new AppError("please provide token", 401))
    let decoded = await jwt.verify(token, process.env.SECRET_KEY)

    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError(" Invalid User", 404))

    if (user.changePasswordAt) {
        let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000)
        if (changePasswordTime > decoded.iat) return next(new AppError(" Invalid Token", 401))
    }

    req.user = user
    next()
})

const allowTo = (...roles) => {
    return handleError((req, res, next) => {
        console.log(req.user.role, roles);

        if (!roles.includes(req.user)) return next(new AppError("you don't have permisson", 403))
        next()
    })
}

export const verifyEmail = handleError((req, res) => {
    let { token } = req.params;
    jwt.verify(token, process.env.VERIFYTOKEN, async (err, decoded) => {
        if (err) return res.json({ message: "err", err })
        let updatedUser = await userModel.findByIdAndUpdate(decoded.id, { isverfied: true }, { new: true })
        res.json({ message: "user is verified", updatedUser })
    })
})

export {
    signUp,
    signIn,
    protectedRoutes,
    allowTo
}