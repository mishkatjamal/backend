const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:String,
    des:String,
    imgUrl:String
})

const noteModel = mongoose.model("notes",noteSchema)
module.exports = noteModel