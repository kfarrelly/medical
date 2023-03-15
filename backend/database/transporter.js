var mongoose = require('mongoose');

transporterSchema = mongoose.Schema({
    serial: {
		type:String,	
	
    },
    medicine:{
        type:String,
    },
    barcode:{
        type:String,
    },
    location:{
        type:String,
    },
    weight:{
        type:String,
    },
    Edate:{
        type:String,
    },
  Mdate:{
        type:String,
    },
	MedicineId: {
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

var transporter = mongoose.model("transporter", transporterSchema);

module.exports = { transporter };
