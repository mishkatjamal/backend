const express = require('express');
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    const isUserIsExist = await userModel.findOne({email});
    if(isUserIsExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const user = await userModel.create({
        name,email,password
    })
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)
res.cookie("jwt_token",token)

    res.status(201).json({
        message:"User registered successfully",
        user,
        token
    })
})
module.exports = authRouter;
