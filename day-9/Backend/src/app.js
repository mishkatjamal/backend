//* server ko create krna

const express = require('express');
const noteModel = require('./models/note.model');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))
/**
 * post - api/notes 
 * create new note and save in mondodb
 * request body - {title, description}
 */

app.post('https://backend-fi2t.onrender.com/api/notes',async(req, res) => {
    const { title, description } = req.body;
    const note = await noteModel.create({ title, description })
    res.status(201).json({
        message : "Note created successfully",
        note
    })
})

/**
 * get - api/notes
 * get all notes from mongodb and send them to response
 */

app.get('https://backend-fi2t.onrender.com/api/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message : "Notes fetched successfully",
        notes
    })
})

/**
 * delete - api/notes/:id
 * delete a note from mongodb by id
 */
app.delete("https://backend-fi2t.onrender.com/api/notes/:id", async(req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id);
    
    res.status(200).json({
        message : "Note deleted successfully",
    })
})

/**
 * patch - api/notes/:id
 * update a note from mongodb by id
 * req.body - {description}
 * */

app.patch("https://backend-fi2t.onrender.com/api/notes/:id", async(req, res) => {
    const id = req.params.id
    const { description } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { description})
    res.status(200).json({
        message : "Note updated successfully",
        note
    })
})

app.use("*name", (req, res) => {
res.sendFile(path.join(__dirname,"..","/public/index.html"));
})
module.exports = app;