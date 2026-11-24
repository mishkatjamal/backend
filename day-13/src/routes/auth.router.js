const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

/* /api/auth/register
POST
 */
authRouter.post("/register",async (req,res)=>{
    // ye user front se jo bhejaga wo hai
    const {name,email,password} = req.body

    // check user pehle se to register nahi hai 
    const isExist = await userModel.findOne({email})
    if(isExist){
        return res.status(409).json({
            message:"User already register with this email try with another email"
        })
    }

    // password ko hash me save karo taki db breech hone per bhi actual password na jae
    const hash = crypto.createHash("md5").update(password).digest("hex")

    // user create hoga db me 
    const user = await userModel.create({
        name,email,password:hash
    })

    // token create karna hi taki server identify kar sake request kis user ne bheji hai 
    // *is me sign me btana hota hai id and JWT secret
    const token = jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET
)

// cookies me set karne ke liye taki server read and write kar sake data 
res.cookie("jwt_token",token)

    // ṛesponse hai ye 
    res.status(201).json({
        message:"user register successfully",
        user
    })

})


/* /api/auth/login
POST
 */
authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body

    //! check kara hai  user register hai ya nahi
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"email is not register on the website"
        })
    }

    // password check karna hai hash wala
        const hash = crypto.createHash("md5").update(password).digest("hex")
        const isPasswordCorrect = user.password ===hash

        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid password"
            })
        }

        const token = jwt.sign({
            id:user._id
        },
        process.env.JWT_SECRET
    )

    // cookies
    res.cookie("jwt_token",token)
        
    // status after email and password matched
    res.status(200).json({
        message:"Login successfully",

    })



})


module.exports = authRouter