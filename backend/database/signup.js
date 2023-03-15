const mongoose = require('mongoose');
const _ = require('lodash');



var schema1=mongoose.Schema({
	firstName:{type:String,required:true,minlength:2,trim:true},
	lastName:{type:String, trim:true},
	role:{type:String},
	mobileNo:{type:Number ,trim:true},	
	location:{type:String,require:true,trim:true},
    email:{type:String, require:true,trim:true,unique: true},
    password:{type:String,require:true,minlength:6,trim:true},	
	publicKey:{type:String},
	privateKey:{type:String},
	userId:{type:String},
	activationKey:{type:String},
	transectionId:{type:String},
	status:{type:Number,default:1}
    });

	
	
var Smodel=mongoose.model('Users',schema1);
module.exports={Smodel};