const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    InvoiceNumber: {
        type: String
    },
    Paymentmode: {
        type: String
    },
    amount: {
        type: String
    },

    Detail: {
        type: String
    },
    CollectionDate: {
       type:String
    },
    installment: {
        type: String
    },
    file: {
        type: String,

    },
    url: {
        type: String,

    },
});

const StudentFee = new mongoose.model("StudentFee", userSchema);


module.exports = StudentFee;