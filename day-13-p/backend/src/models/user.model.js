const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"user already register with email try with another email"]
    },
    password:String
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel