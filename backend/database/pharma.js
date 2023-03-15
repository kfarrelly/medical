var mongoose = require('mongoose');

pharmaSchema = mongoose.Schema({
    batchid: {  
        type: String,
        required: true,
        trim: true
    },
    medicineStatus: {
        type: String,
        required: true
    },

    medicineQuality: {
        type: String,
        required: true
    }
});

var pharma = mongoose.model("pharma", pharmaSchema);

module.exports = { pharma };
