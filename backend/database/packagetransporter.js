var mongoose = require('mongoose');

transporterSchema = mongoose.Schema({
    serial: {
		type:String,	
	
    },
    medicines:{
        type:String,
    },
    barcode:{
        type:String,
    },
	packages:{
        type:String,
    },
    location:{
        type:String,
    },
	level:{
        type:String,
    },
	PackageId: {
		type:String,	
	},
	
	role: {
		type:String,
		
	},	
	time:{
		type:String,
    },
    publickey:{
        type:String,
    },
    status:{
        type:String,
    }
   
});

var packagetransporter = mongoose.model("packagetransporter", transporterSchema);

module.exports = { packagetransporter };
