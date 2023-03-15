var mongoose=require ('mongoose');

PackageStatus = mongoose.Schema({
	serial: {
		type:String,	
	
    },
    medicines:{
        type:String,
    },
    barcode:{
        type:String,
    },
    location:{
        type:String,
    },
    level:{
        type:String,
    },
    packages:{
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
    status:{
            type:String,
        }
    
	
});
var newPackageStatus= mongoose.model('newPackageStatus', PackageStatus);
module.exports={newPackageStatus};