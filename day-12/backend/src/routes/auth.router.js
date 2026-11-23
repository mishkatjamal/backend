const express = require("express")
const authRouter = express.Router()
const userModel = require("../models/user.model")
const jwt  = require("jsonwebtoken")
// /api/auth/register
// POST

authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body

    // check email already register to nahi hai 
    const isAlreadyExist = await userModel.findOne({email})
    if (isAlreadyExist) {
        return res.status(409).json({
            message:"user alredy exists with this email"
        })
    }
    // agar already reister nahi hai to register kar dega 
    const user = await userModel.create({
        name,email,password
    })

    // create token
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)

// set token in cookie
res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user register successfully",
        user,
        token
    })

})

module.exports = authRouter