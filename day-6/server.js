// server ko start karna
// server ko db se connect karna

const app = require("./src/app")
const mongoose = require("mongoose")

// connect to db
function connectToDb(){
    mongoose.connect("mongodb+srv://mishkatjamal13_db_user:mishkat13@backendclus.zydhrj2.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to DB");
        
    })
}
connectToDb()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})
