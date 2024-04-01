import express from 'express'
import { signIn, signUp, verifyEmail } from './auth.controller.js'
const authRoutes = express.Router()

authRoutes.route("/signup").post(signUp)
authRoutes.route("/signin").post(signIn)
authRoutes.route("/verify/:token").get(verifyEmail)


export default authRoutes