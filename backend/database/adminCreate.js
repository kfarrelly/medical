var mongoose = require('mongoose');

UserSchema = mongoose.Schema({

	name: {
		type:String,
		required:true,
		unique:true,
		trim:true
	},
	location: {
		type:String,
		required:true
	},
	
	role: {
		type:String,
		required:true
	}
});

var adminCreateUser = mongoose.model('adminCreateUser', UserSchema);

module.exports = { adminCreateUser };