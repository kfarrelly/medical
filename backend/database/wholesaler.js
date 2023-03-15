var mongoose = require('mongoose');

wholesalerSchema = mongoose.Schema({

	batchid: {
		type:String,
		required:true,	
		trim:true
	},
	shipper: {
		type:String,
		required:true
	},
	
	reciver: {
		type:String,
		required:true
	}
});

var wholesaler = mongoose.model('wholesaler', wholesalerSchema);

module.exports = { wholesaler };