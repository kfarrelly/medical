var { Smodel } = require('../database/signup');
var jwt = require('jsonwebtoken');

var logauth = (req, res, next) => {
	var token = req.header('x-token');

	dcoded = jwt.verify(token, 'meKey');

	Smodel.findOne({'_id':dcoded._id, 'token':token}).then((usr) => {
		if(!usr) { return res.status(400).send(); }
		req.user = usr;
		req.token = token;
		next();
	}).catch((err) => {
		return res.status(400).send(err);
	});

}

module.exports = { logauth };