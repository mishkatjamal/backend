const express = require("express")
const app = express()

app.use(express.json())

// notes array 
const notes = []

// POST /notes 
// data bhej ne ke liye
app.post("/notes",(req,res)=>{
    // console.log(req.body);
    notes.push(req.body)
    res.send("note created successfully")
    
})

// GET /notes
// data mangwane ke liye use kare
app.get("/notes",(req,res)=>{
    res.send(notes)
    
})

// ^params
// DELETE /notes/:index
// to delete note index bhje zaruri hai
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("note deleted successfully")
})


// PATCH /notes/:index
// to update some part in the note
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].des = req.body.des
    res.send("note updated successflly")
})

module.exports = app