const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());

const notes = [];
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    
    res.send("note received");
})


app.get("/notes",(req,res)=>{
    res.send(notes);
});
    

app.delete("/notes/:id",(req,res)=>{
    delete notes[req.params.id];
    res.send("note deleted");
});

app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].content = req.body.content;
    res.send("note updated");
});
module.exports = app