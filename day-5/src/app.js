const express = require("express")
const app = express()
app.use(express.json())


const notes = []

// POST /notes
app.post("/notes",(req,res)=>{
    notes.push(req.body)

    res.status(200).json({
        message:"note created successfully"
    })
})

// GET /notes
app.get("/notes",(req,res)=>{
    res.status(201).json({
        notes:notes
    })
})

// PATCH /notes/:id
app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].des= req.body.des

    res.status(200).json({
        message:"note updated successfully"
    })
})

// DELETE /notes/:id
app.delete("/notes/:id",(req,res)=>{
    delete notes[req.params.id]

    res.status(200).json({
        message:"note deleted successfully"
    })
})

module.exports = app