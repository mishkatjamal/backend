const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGOa_URI)
    .then(() => { console.log('Connected to MongoDB') })
};
module.exports = connectToDB;