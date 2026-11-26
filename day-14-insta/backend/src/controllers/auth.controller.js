const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")



/* 
register user controller logic
 */
async function registerUserController(req,res){
    const{username,email,password,bio,profileImage} =req.body

    /* 
    check karo user exists to nahi karta hai pehle se uername and email se 
     */
    const isUserExist = await userModel.findOne({
        /* 
        ye $or array mangta hia conditions ka object me 
         */
        $or:[
            {username},
            {email}
        ]
    })

    /* 
    agar user pehel se hai to yahi se return kar dege 409 me 
     */
    if(isUserExist){
        return res.status(409).json({
            message: "user alredy exist "+(isUserExist.username == username?"username alredy exist":"email alredy exist")
        })
    }

    /*
    password ko has me save kare ge 
     */
    const hash =crypto.createHash("md5").update(password).digest("hex")

    /* user create hoga  */
    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    /* token create kar ge */
    const token =jwt.sign({
        /* 2 condition satisfied honi cahiye 
        1:- user ka data ho
        2:-unique ho
         */
        id:user._id
    },
    process.env.JWT_SECRET,{expiresIn:"1d"}
)

/* cookies me set kar dege */
res.cookie("toke",token)

/* response me kabhi bhi password nahi bhejna hai */
res.status(201).json({
    message:"user register successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
})
}


/*
login user controller logic 
 */

async function loginUserController(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}

        ]
    })

    /*
    check karo user register hai ya nahi  
     */
    if(!user){
        return res.status(409).json({
            message:"user not register"
        })
    }

    /* hash me passsword convert karke check kare ge password match karta hai ya nahi */
    const hash =crypto.createHash("md5").update(password).digest("hex")

    const isPassword = hash== user.password

    /* check password sahi hai ya nahi */
    if(!isPassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    /* agar sab sahi hai to token dedo */
    const token = jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET,{expiresIn:"1d"}
)

/* cookies me set */
res.cookie("token",token)

res.status(200).json({
    message:"user loggedin successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
})
}


module.exports = {
    registerUserController,
    loginUserController
}