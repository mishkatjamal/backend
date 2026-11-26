const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username is alredy exists try with another username"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"email is alredy register try with another email"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/mishkat13/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel