var mongoose=require ('mongoose');

Package = mongoose.Schema({
	serial: {
		type:String,	
	
    },
    medicines:{
        type:String,
    },
    level:{
        type:String,
    },
    location:{
        type:String,
    },
    packages:{
        type:String,
    },
	role: {
		type:String,
		
	},
	parent: {
		type:String,
		default:'0'
	},
	PackageId:{
		type:String,
	},
	time:{ type : Date, default: Date.now },
    status:{
        type:String,
		default: '0'
    },
    userId:{
        type:String,
    }
	
	
});
var cpackage= mongoose.model('cpackage', Package);
module.exports={cpackage};