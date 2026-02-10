// server ko start karna and data base ko connect karna

const app = require('./src/app');
const mongoose = require('mongoose');
function mongooseConnect(){
    mongoose.connect('mongodb+srv://mishkat:DV4a4Cx2VJjKWrCx@cluster0.rmquhpv.mongodb.net/day-6')
    .then(() => {
        console.log('mongoose connected');
    })
}    
mongooseConnect();
app.listen(3000, () =>{
    console.log('server is running on port 3000');
})