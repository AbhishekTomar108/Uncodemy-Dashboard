const mongoose = require("mongoose");
const {Schema} = mongoose


const SubmitItem = new Schema({

    trainerName:{
        type:String 
    },

    itemName:{
       type:String
    },

    student: {
        type: String

    },
    batch: {
        type: String
       
    },
    course: {
        type: String
      
    },   
    
    date:{
        type: Date,
        default: Date.now
    }
})
const submititem = mongoose.model("submitdocuments", SubmitItem);

module.exports = submititem;