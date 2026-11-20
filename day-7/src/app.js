const express = require("express")
const app = express()
app.use(express.json())

const noteModel = require("./models/notes.model")

// POST /notes
app.post("/notes",async (req,res)=>{

    const {tittle,des} = req.body

    const note = await noteModel.create({
        tittle,des
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })
})

// GET /notes
app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()
    
    res.status(200).json({
        notes
    })
})

module.exports = app