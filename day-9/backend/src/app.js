const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
const noteModel = require("./models/note.model")
const path = require("path")
app.use(express.static("./public"))
// POST /api/notes
// to create a note on data base 
app.post("/api/notes",async (req,res)=>{
    const {tittle,des} = req.body
    const note = await noteModel.create({
       tittle,des
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })
})

// GET /api/notes
// to get all the post from database and send in the response
app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

// DELETE /api/notes/:id
// use params to get id and delete it
app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfully"
    })
})


// PATCH /api/notes/:id
// to update something in note
app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {des} = req.body
    await noteModel.findByIdAndUpdate(id,{des})

    res.status(200).json({
        message:"note updated successfully"
    })
})

// wild card 
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname),"..","/public/index.html")
})


module.exports = app