const express = require("express")
const authRouter = express.Router()
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


// register api logic
authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body

    // check user is alredy exist or not if yes then return response use another email
    const isUser = await userModel.findOne({email})
    if(isUser){
        return res.status(400).json({
            message:"User alredy exist with this email try with another email"
        })
    }

    // save password into hash
    const hash =crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name,email,password:hash
    })

    // token dena hai 
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)
// token set in cookies
res.cookie("jwt_token",token)


    res.status(201).json({
        message:"user register successfully",
        user
    })
})


// login api logic
authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body

    // check karo user hai ya nahi
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found please register"
        })
    }

    // password check karo sahi hai ya nahi
    const hash =crypto.createHash("md5").update(password).digest("hex")
    const isPassword = user.password ===hash
    if(!isPassword){
        return res.status(409).json({
            message:"Wrong password"
        })
    }

    // token 
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)

// set token in cookie
res.cookie("jwt_token",token)

res.status(200).json({
    message:"user login successfully",
    user
})

})
module.exports = authRouter