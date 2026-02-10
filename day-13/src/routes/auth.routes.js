const express = require('express');
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    const isUserIsExist = await userModel.findOne({email});
    if(isUserIsExist){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const has = crypto.createHash("sha256").update(password).digest("hex");
    const user = await userModel.create({
        name,email,password:has
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

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);
    
    res.status(200).json({
        message:"Protected route accessed successfully",
    })
})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const has = crypto.createHash("sha256").update(password).digest("hex");
    const isPasswordMatch = user.password === has;
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)
res.cookie("jwt_token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user,
        token
    })
})

module.exports = authRouter;
