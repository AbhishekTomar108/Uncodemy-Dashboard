const mongoose = require("mongoose");
const { Schema } = mongoose


const StudentMessageModel = new Schema({

    message: {
        type: String
    },
    receiverId: {
      type:String
    },
    senderId: {
      type:String
    },
    date: {
        type:String
    }
})
const StudentMessageSchema = mongoose.model("studentmessages", StudentMessageModel);

module.exports = StudentMessageSchema;