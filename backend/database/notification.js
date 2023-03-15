const mongoose = require('mongoose');
const _ = require('lodash');



var schema1=mongoose.Schema({
	userId:{type:String},
	notification:{type:String},
	edate:{ type : Date, default: Date.now },
	status:{type:Number,default:0}
    });

	
	
var notification=mongoose.model('Notification',schema1);
module.exports={notification};