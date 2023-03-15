var mongoose = require('mongoose');

medicineRequest = mongoose.Schema({

	manufacturarId: {
		type:String,
		required:true
	},
	wholesalerId: {
		type:String,
		required:true
	},
	
	transporterId: {
		type:String,
		required:true
	},
	
	medicineId: {
		type:String,
		required:true
	}
});

var mRequest = mongoose.model('mRequest', medicineRequest);

module.exports = { mRequest };