var mongoose = require("mongoose");

manufactureSchema = mongoose.Schema({
  medicinedescription: {
    type: String,
    required: true,
    trim: true
  },
  medicineStatus: {
    type: String,
    required: true
  },

  pickdate: {
    type: String,
    required: true
  },

  packdate:{
    type:String,
    required: true
  },

  reciver: {
    type: String,
    required: true
  },
  quality: {
    type: String,
    required: true
  },
  recivertype: {
    type: String,
    required: true
  }
});

var manufacture = mongoose.model("manufacture", manufactureSchema);

module.exports = { manufacture };
