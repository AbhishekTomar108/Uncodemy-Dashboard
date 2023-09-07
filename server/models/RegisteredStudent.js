const mongoose = require("mongoose");

const RegisterStudentSchema = new mongoose.Schema({

    Name: {
        type: String,

    },
    Number: {
        type: Number,

    },
    Pname: {
        type: String,


    },
    Pnumber: {
        type: String,


    },
    RegistrationDate: {
        type: String,

    },

    Course: {
        type: String,

    },

    Counselor: {
        type: String,

    },

    RegistrationFees: {
        type: String,

    },

    TrainerName: {
        type: String,

    },

    BatchMode: {
        type: String,

    },

    BatchTiming: {
        type: String,

    },

    Remark: {
        type: String,

    },
    file: {
        type: String,
    }

});

const users = new mongoose.model("registeredStudents", RegisterStudentSchema);


module.exports = users;