const express =require("express")
const app = express()
app.use(express.json())
const noteModel = require("./models/note.model")
const cors = require("cors")
app.use(cors())
const path = require("path")
app.use(express.static("./public"))
/*
note create with 
^POST 
/api/notes
 */
app.post("/api/notes",async (req,res)=>{
    const {title,des,imgUrl} = req.body

    const note = await noteModel.create({
        title,des,imgUrl
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })
})


/*
fetch all notes
^GET
/api/notes
 */
app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

/*
delete a note
^DELETE
/api/notes/:id
*/
app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted succesfully"
    })
})

/*
update something in notes note reqplace hole noe
^PATCH
/api/notes/:id
*/
app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {title,des,imgUrl} =req.body
    await noteModel.findByIdAndUpdate(id,{title,des,imgUrl})

    res.status(200).json({
        message:"note updated successfully",
    })
})


// wild card
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/pubic/index.html"))
})

module.exports = app