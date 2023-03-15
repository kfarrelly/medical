const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');
const _ = require('lodash');
const jwt=require('jsonwebtoken');


var schema2=mongoose.Schema({
	firstName:{type:String,required:true,minlength:2,trim:true},
	lastName:{type:String, trim:true},
	role:{type:String},
	mobileNo:{type:Number ,trim:true},	
	location:{type:String,require:true,trim:true},
    email:{type:String, require:true,trim:true,unique: true},	
    password:{type:String,require:true,minlength:6,trim:true},
	publicKey:{type:String},
	userId:{type:String},
	activationKey:{type:String},
	transectionId:{type:String},
	token:{ type:String},
	status:{type:Number,default:1}

});
schema2.pre('save', function(next){
	var usr = this;
	console.log('Pre',usr);
	if(usr.isModified('password'))
	{
		bcrypt.genSalt(7, (err, salt) => {
		if (err) { return console.log(err); }
		bcrypt.hash(usr.password, salt, (err, hash) => {
			if (err) { return console.log(err); }
				usr.password = hash;
				next();
			});
		});
	}
	else
	{
		next();
	}
	});

	// schema1.methods.generateAuthToken = function () {
	// 	var user=this;
	// 	var access='auth';
	// 	var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
	// 	if(user.tokens.length!=0){
	// 		user.tokens.splice(0,1,{access,token});
	// 	}
	// 	else{
	// 		user.tokens.push({access,token});
	// 	}
	
	// 	return user.save().then(()=>{
	// 		return token;
	// 	});
	// };
	
var Userlogin2=mongoose.model('Userlogin2',schema2);
//console.log(Smodel);
module.exports={Userlogin2};