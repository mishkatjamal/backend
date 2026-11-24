const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

//^ user resgister router 
authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body

    // check email is already exists 
    const isExist = await userModel.findOne({email})
    if (isExist) {
        return res.status(409).json({
            message:"user already regsiter with this email address try with another email"
        })
    }

    // password convert into hash password
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =await userModel.create({
        name,email,password:hash
    })

    // cerate token
    const token = jwt.sign({
        id:user._id,

    },
    process.env.JWT_SECRET
)

// set in cookie on client  side (user ke sie per cookies me set kare ge )
res.cookie("jwt_token",token)

// send response to the user
    res.status(201).json({
        message:"user register successfully",
        user,
        
    })
})
//^ user resgister router 

module.exports = authRouter