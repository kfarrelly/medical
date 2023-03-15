const express = require("express");
const app = express();
var { Smodel } = require('./database/signup');
var { Userlogin2 } = require('./database/login')
var { adminCreateUser } = require('./database/adminCreate');
var bodyParser = require('body-parser');
var { mongoose } = require('./database/mongooes');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');
var { logauth } = require('./database/auth')
var { cmedicine } = require('./database/medicine');
var { newMedicineStatus } = require('./database/medicineStatus');
var { mTransection } = require('./database/transection');
var { wholesaler } = require('./database/wholesaler');
var { distrubuter } = require('./database/distrubuter');
var { pharma } = require('./database/pharma');
var { transporter } = require('./database/transporter');
var { manufacture } = require('./database/manufacture');
var nodemailer = require('nodemailer');
const { createContext, Signer } = require('sawtooth-sdk/signing');
const secp256k1 = require('sawtooth-sdk/signing/secp256k1');
const { createHash } = require('crypto');
const PREFIX = '925160';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(10000, () => {
	console.log("server is running on port 10000");
});

/**********************************************email************************************************/
var transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'dilbag.survinitsolutions@gmail.com',
		pass: 'dillubhai1996'
	}
});



/**************************************************post methods******************************* */



//browser cors policy 
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', ' Origin, Content-Type, X-Auth-Token,Accept');
	res.setHeader('Access-Control-Expose-Headers', 'x-token');
	next();
});


function getAddress(key, length = 64) {
	return createHash('sha512').update(key).digest('hex').slice(0, length)
}

function getUserID(userAddress, uesrRole) { return (PREFIX + "0" + uesrRole + getAddress(userAddress, 62)) }
function getMedicineID(serialNumber) { return (PREFIX + "06" + getAddress(serialNumber, 62)) }



/// generatin public key by private key for verification	

app.post('/keymatch', (req, res) => {

	console.log('request', req.body.pkey);
	var pvtKey = req.body.pkey;
	var privateKey1 = { "privateKeyBytes": Buffer.from(pvtKey, 'hex') }
	const context = createContext('secp256k1');
	var regenratedPublicKey = context.getPublicKey(privateKey1).asHex();

	res.status(200).send(JSON.stringify(regenratedPublicKey));
	
});

// forget password api

app.post('/sendResetMail', (req, res) => {
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	var mailOptions = {
		from: 'dilbag.survinitsolutions@gmail.com',
		to: req.body.email,
		subject: 'Email verification ',
		text: 'You are Registered',
		html: '<b>click to reset password:</b> <a href="http://84.22.96.222/wholesalerqr/'+req.body.email+'"> click here to reset </a>'
	};
	transport.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.status(200).send(JSON.stringify('Reset Password Link not sent'));
		} else {
			console.log('Email sent: ' + info.response);
			res.status(200).send(JSON.stringify('Reset Password Link send on your EmailId'));
		}
	});		
		
	
	});



app.post('/resetPassword', (req, res) => {	
	 var email =req.body.email;
	 var password=req.body.password;	

	bcrypt.genSalt(7, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {			
			var pass= hash;	
			var update = {'password': pass};
			var options = { new: false };	
			Userlogin2.findOneAndUpdate({ 'email': email }, update, options).then((err, result) => {
				console.log(' password updated',result);
				res.status(200).send(JSON.stringify('Password Update'));
			}).catch((err) => {
				res.status(400).send(JSON.stringify('Unable to Update Password'));
			});
			 
		});
	});
	var mailOptions = {
		from: 'dilbag.survinitsolutions@gmail.com',
		to: req.query.email,
		subject: 'Email verification',
		text: 'You are Registered',
		html: '<b>Password Reset</b>'
	};
		transport.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
});

	// signup post api

	app.post("/signup", (req, res) => {

		//public private key;
		const context = createContext('secp256k1');
		const privateKey = context.newRandomPrivateKey();
		const publicKey = context.getPublicKey(privateKey).asHex();

		const finalPprivateKey = privateKey.asHex();
		//generation userid 
		var genUserid = getUserID(publicKey, req.body.role);

		var myData = new Smodel(req.body);

		myData.publicKey = publicKey;
		myData.privateKey = finalPprivateKey;
		myData.userId = genUserid;
		myData.save().then((item) => {
			console.log(item);
			res.status(200).send(JSON.stringify(item));
		}).catch((err) => {
			res.status(400).send(JSON.stringify("database not saved", err));
		});

		// var mailOptions = {
		// 	from: 'dilbag.survinitsolutions@gmail.com',
		// 	to: req.query.email,
		// 	subject: 'Email verification ',
		// 	text: 'You are Registered',
		// 	html: '<b>SignUp Success</b>'
		// };
		// 	transport.sendMail(mailOptions, function (error, info) {
		// 	if (error) {
		// 		console.log(error);
		// 	} else {
		// 		console.log('Email sent: ' + info.response);
		// 	}
		// });
	});

	//user schema 2

	app.post("/signup2", (req, res) => {

		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.body.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Welcome to Medicine Site</b><br> You can Login now <br> Use your valid private Key <br><b> Your TransectionId </b> =' + req.body.transectionId
		};
		transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		var myData2 = new Userlogin2(req.body);

		myData2.save().then((item) => {
			res.status(200).send(JSON.stringify("item saved to database", item));
		}).catch((err) => {
			res.status(400).send(JSON.stringify("database not saved", err));
		});
	});


	//login api
	app.post('/login', (req, res) => {
		Userlogin2.findOne({ 'email': req.body.email }).then((result) => {
			if (!result) { return res.status(404).send("not authorised"); }
			bcrypt.compare(req.body.password, result.password, (er, reslt) => {
				if (reslt) {
					var nwToken = jwt.sign({ _id: result._id }, 'meKey').toString();
					result.token = nwToken;

					result.save().then(() => {
						res.status(200).header('x-token', nwToken).send(result);
					});
				}
				else { res.status(400).send(er); }
			});
		}).catch((err) => {
			res.status(400).send(err);
		});


		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Yor are Successfully Login</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	});


	// app.post('/login', (req, res) => {
	// 	Smodel.findOne({'email':req.body.email}).then( (result) => {	
	// 		res.status(200).send(result);
	// 	}).catch( (err) => {
	// 		res.status(400).send(err);
	// 	});
	// });




	

	//new user api

	app.post('/newuser', (req, res) => {
		res.header('confirmation', 'Creating New user');



		newUser = new adminCreateUser(req.body);
		newUser.save().then((result) => {
			res.status(200).send(JSON.stringify("User created", result));
		}).catch((err) => {
			res.status(400).send(JSON.stringify("User not created", err));
		});

		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>New User Created</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});


	});
	//new user api end

	//wholesaler api start

	app.post('/postWholesaler', (req, res) => {
		// res.header('confirmation', 'Creating New user');
		createwholesaler = new wholesaler(req.body);
		createwholesaler.save().then((result) => {
			res.status(200).send(JSON.stringify("User created", result));
		}).catch((err) => {
			res.status(400).send(JSON.stringify("User not created", err));
		});

		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Wholesaler Registered</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	});

	//wholesaler api end

	//Pharma Start
	app.post("/postPharma", (req, res) => {
		// res.header('confirmation', 'Creating New user');
		createpharma = new pharma(req.body);
		createpharma.save().then(result => {
			res.status(200).send(JSON.stringify("User created", result));
		})
			.catch(err => {
				res.status(400).send(JSON.stringify("User not created", err));
			});



			var mailOptions = {
				from: 'dilbag.survinitsolutions@gmail.com',
				to: req.query.email,
				subject: 'Email verification ',
				text: 'You are Registered',
				html: '<b>Pharma Registered</b>'
			};
				transport.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});


	});

	//Pharma End

	//Manufacture Start
	app.post('/postManufacture', (req, res) => {
		// res.header('confirmation', 'Creating New user');
		createman = new manufacture(req.body);
		createman.save().then((result) => {
			res.status(200).send(JSON.stringify("User created", result));
		}).catch((err) => {
			res.status(400).send(JSON.stringify("Not Valid Data"));
		});
		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Manufacture Registered</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	});

	//Manufacture End

	//Distributor Api Start
	app.post('/postDistrubuter', (req, res) => {
		// res.header('confirmation', 'Creating New user');
		createdist = new distrubuter(req.body);
		createdist.save().then((result) => {
			res.status(200).send(JSON.stringify("User created", result));
		}).catch((err) => { 
			res.status(400).send(JSON.stringify("User not created", err));
		});
		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Pharma Registered</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	});
	//Distributor Api End 

	//Transporter Api StartpostTransporter
	app.post('/postTransporter', (req, res) => {	
		console.log(req.body);	
		console.log(req.params);
		console.log(req.query);	
		// res.header('confirmation', 'Creating New user');
		transporter.find({ publickey: req.body.publickey, MedicineId: req.body.MedicineId}, (err, result1) => {
			if (result1.length > 0) {
				console.log('my result',result1);
				res.status(400).send("Field Already Exits");
			} else {
				createtrans = new transporter(req.body);
				createtrans.save().then((result) => {
					console.log('my result 2',result);
					res.status(200).send(JSON.stringify("User created", result));
				}).catch((err) => {
					res.status(400).send(JSON.stringify("User not created", err));
				});
			}
		});
		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Transporter Registered</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	});
	//transporter Api End


	//create medicine
	app.post('/newmedicine', (req, res) => {	
		console.log(req.body);	
		console.log(req.params);
		console.log(req.query);
		res.header('confirmation', 'Creating New Medicine');

		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Medicine created</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		var genMedicineId = getMedicineID(req.body.serial);
		medicine = new cmedicine(req.body);
		medicine.MedicineId = genMedicineId;
		medicine.save().then((result) => {
			res.status(200).send(JSON.stringify(result));

		}).catch((err) => {
			res.status(400).send(JSON.stringify(err));
		});
	});
	//create medicine end

	//medicine update
	app.post('/medicineStatusUpdate', (req, res) => {
		console.log('dilbag', req.body);
		res.header('confirmation', 'status update');
		medicineState = new newMedicineStatus(req.body);
		medicineState.save().then((result) => {
			console.log('singh', result);
			res.status(200).send(JSON.stringify(result));
		}).catch((err) => {
			res.status(400).send(JSON.stringify(err));
		});

		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Medicine Status Updated</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

	});

	//medcine transportation

	app.post('/transection1', (req, res) => {
		console.log('transection', req.body);
		res.header('confirmation', 'new transection');
		mTrans = new mTransection(req.body);
		mTrans.save().then((result) => {
			console.log('transection result', result);
			res.status(200).send(JSON.stringify(result));

		}).catch((err) => {
			res.status(400).send(JSON.stringify(err));
		});

		var mailOptions = {
			from: 'dilbag.survinitsolutions@gmail.com',
			to: req.query.email,
			subject: 'Email verification ',
			text: 'You are Registered',
			html: '<b>Transection completed</b>'
		};
			transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		
	});



	/********************************get method ********************************************* */

	app.get('/profile', (req, res) => {
		Userlogin2.findOne({ 'token': req.query.token }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/allUser', (req, res) => {
		Smodel.find({}).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/validUser', (req, res) => {
		Userlogin2.find({}).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});



	app.get('/getwholesalerUser', (req, res) => {
		Userlogin2.find({ role: '3' }).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getTransporterUser', (req, res) => {
		Userlogin2.find({ role: '7' }).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getDistributerUser', (req, res) => {
		Userlogin2.find({ role: '4' }).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getManufactureUser', (req, res) => {
		Userlogin2.find({ role: '2' }).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getPharmaUser', (req, res) => {
		Userlogin2.find({ role: '5' }).then((result) => {

			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});
	// get feilds ///////////////////////////////////////////////////

	app.get('/getTransection', (req, res) => {
		mTransection.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getmedicinelist', (req, res) => {
		cmedicine.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.post('/getMedicineUserId',(req,res)=>{	
		console.log(req.params);	
		console.log(req.body);
		console.log(req.query);
		cmedicine.find({userId:req.body.userId}).then((result)=>{
			res.status(200).send(result);
		
		}).catch((err)=>{
			res.status(400).send(err);
		});
	});

	// app.get('/transporter',(req,res)=>{
	// 	transporter.find({}).then((result)=>{
	// 	res.status(200).send(result);
	// 	}).catch((err) => {
	// 		res.status(400).send(err); 
	// 	});
	// 	});

	app.get('/getMedicineStatus/:id', (req, res) => {

		cmedicine.find({ serial: req.params.id }).then((result) => {
			res.status(200).send(JSON.stringify(result));
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	app.get('/getByMedicineId/:id', (req, res) => {
		console.log(req.params.id);
		cmedicine.find({ MedicineId: req.params.id }).then((result) => {
			res.status(200).send(JSON.stringify(result));
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getMedicineStatus2/:id', (req, res) => {

		newMedicineStatus.find({ serial: req.params.id }).then((result) => {
			res.status(200).send(JSON.stringify(result));
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	app.get('/getdistributerlist', (req, res) => {
		distrubuter.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	app.get('/getmanufacturelist', (req, res) => {
		manufacture.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getwholesalerlist', (req, res) => {
		wholesaler.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getpharmalist', (req, res) => {
		pharma.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/gettransporterlist', (req, res) => {
		transporter.find({}).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/getTransporter/:id', (req, res) => {
		transporter.find({ 'publickey': req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	/*****************************delete api ************************/
	app.get('/deleteUser/:id', (req, res) => {
		Smodel.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	app.get('/deletevalidUser/:id', (req, res) => {
		Userlogin2.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	app.get('/deleteMedicine/:id', (req, res) => {
		cmedicine.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/deleteWholesaler/:id', (req, res) => {
		wholesaler.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	app.get('/deleteDistrubuter/:id', (req, res) => {
		distrubuter.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/deletePharma/:id', (req, res) => {
		pharma.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/deleteManufacture/:id', (req, res) => {
		manufacture.findByIdAndRemove({ _id: req.params.id }).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	/************************************edit api************************************************ */


	//medicine staus edit

	app.get('/editMedicineStatus/:id', (req, res) => {
		let id = req.params.id;
		cmedicine.findById(id).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});


	// Defined edit route
	app.get('/edit/:id', (req, res) => {
		let id = req.params.id;
		pharma.findById(id).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/editDistributor/:id', (req, res) => {
		let id = req.params.id;
		distrubuter.findById(id).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	app.get('/editWholesaler/:id', (req, res) => {
		let id = req.params.id;
		wholesaler.findById(id).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});
	app.get('/editManufacture/:id', (req, res) => {
		let id = req.params.id;
		manufacture.findById(id).then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			res.status(400).send(err);
		});
	});

	/********************************************************update api************************************************************************** */
	
	app.post('/updateprofile/:id', (req, res) => {
		var update = {
			'firstName':req.body.firstName,
			'lastName':req.body.lastName,
			'mobileNo':req.body.mobileNo,
			'email':req.body.email,
			'location':req.body.location
		};
		var options = { new: false };
		Userlogin2.findOneAndUpdate({ publicKey:req.params.id}, update, options).then(( doc) =>{
			res.status(200).send(doc);
			console.log('responser',doc);
		}).catch((err) => {
			res.status(400).send(err);
			console.log('responser error',err);
		});
	});
	app.post('/updatepharma/:id', (req, res) => {

		var update = {
			'batchid': req.body.batchid,
			'medicineStatus': req.body.medicineStatus,
			'medicineQuality': req.body.medicineQuality
		};
		var options = { new: false };
		pharma.findOneAndUpdate({ _id: req.params.id }, update, options, function (err, doc) {
			console.log(req.params.id, update);
		});
	});

	app.post('/updateWholesaler/:id', (req, res) => {

		var update = {
			'batchid': req.body.batchid,
			'reciver': req.body.reciver,
			'shipper': req.body.shipper
		};
		var options = { new: false };
		wholesaler.findOneAndUpdate({ _id: req.params.id }, update, options, function (err, doc) {

		});
	});

	app.post('/updateManufacture/:id', (req, res) => {

		var update = {
			'medicineStatus': req.body.medicineStatus,
			'medicinedescription': req.body.medicinedescription,
			'packdate': req.body.packdate,
			'pickdate': req.body.pickdate,
			'quality': req.body.quality,
			'reciver': req.body.reciver,
			'recivertype': req.body.recivertype
		};
		var options = { new: false };
		console.log(req.params.id);
		manufacture.findOneAndUpdate({ _id: req.params.id }, update, options, function (err, doc) {

		});
	});

	app.post("/updateDistributor/:id", (req, res) => {
		var update = {
			batchid: req.body.batchid,
			shipper: req.body.shipper,
			reciver: req.body.reciver
		};
		var options = { new: false };
		distrubuter.findOneAndUpdate(
			{ _id: req.params.id },
			update,
			options,
			function (err, doc) { }
		);
	});







	//---Logout
	app.post('/logOut', (req, res) => {
		console.log('mytoken', req.body.token);
		var token = req.body.token;

		dcoded = jwt.verify(token, 'meKey');

		Userlogin2.findOne({ '_id': dcoded._id }).then(() => {
			Userlogin2.updateOne({ 'token': token }, { 'token': "" }, (err, result) => {
				if (err) { return res.status(400).send(err); }
				res.status(200).send();
			});
		}).catch((err) => {
			res.status(400).send(err);
		});
	});
//---Logout End

