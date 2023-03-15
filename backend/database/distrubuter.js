var mongoose = require('mongoose');

distrubuterSchema = mongoose.Schema({
  batchid: {
    type: String,
    required: true,
    trim: true
  },
  shipper: {
    type: String,
    required: true
  },

  reciver: {
    type: String,
    required: true
  }
});

var distrubuter = mongoose.model("distrubuter", distrubuterSchema);

module.exports = { distrubuter };
