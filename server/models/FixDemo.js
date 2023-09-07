const mongoose = require("mongoose");



const DemoSchema = new mongoose.Schema({
   
    Name: {
        type: String,
    },
    Email: {
        type: String,
       
    },
    Time: {
        type: String,
      
    },
    Date: {
        type: String,
    },
    day: {
        type: String,
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    Trainer: {
        type: String,
    },
    Course: {
        type: String,
    }, 
    Background: {
        type: String,
    },   
    classLink: {
        type: String,
    }   
})
const FixDemo = new mongoose.model("demoes",DemoSchema);

module.exports = FixDemo;