const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")

/* 
POST /api/auth/register
 */
authRouter.post("/register",authController.registerUserController)

/* 
POST /api/auth/login
 */
authRouter.post("/login",authController.loginUserController)

module.exports =authRouter
