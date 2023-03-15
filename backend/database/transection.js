var mongoose = require('mongoose');

medicineTransection = mongoose.Schema({

	serial: {
		type:String,
		required:true,	
		trim:true
	},
	wholesalerId: {
		type:String,
		required:true
	},
	senderId: {
		type:String
	},
	edate:{ type : Date, default: Date.now },
	transporterId: {
		type:String,
		required:true
	}
});

var mTransection = mongoose.model('mTransection', medicineTransection);

module.exports = { mTransection };