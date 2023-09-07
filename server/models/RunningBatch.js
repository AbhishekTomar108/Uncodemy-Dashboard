const mongoose = require("mongoose");



const runningBatchSchema = new mongoose.Schema({
    Batch: {
        type: String,

    },
    Trainer: {
        type: String,

    },
    
    TrainerID: {
        type: String,

    },
    TrainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploads'
    },
    BatchTime: {
        type: String,

    },
    Days: {
        type: String,
    }
})

const runningBatch = new mongoose.model("RunningBatches", runningBatchSchema);

module.exports = runningBatch;