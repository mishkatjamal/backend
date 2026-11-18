const express = require("express")
const app = express()
app.use(express.json())

let notes = []

// koi data bhejne ke liye use karte hai POST ka
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send("note created")
})

// koi data get karne ke liye GET ka use karte hai
app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})