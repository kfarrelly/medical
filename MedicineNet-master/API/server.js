var express = require('express');
var bodyParser = require('body-parser');
const {
    createContext,
    Signer
} = require('sawtooth-sdk/signing')
const secp256k1 = require('sawtooth-sdk/signing/secp256k1')

const {
    makeKeyPair,
    getState,
    submitUpdate,
    getStateByEntityName,
    getIDDetails
} = require('./src/state')


app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Please check parameter or payload')
})

/**************************************** API **********************************************/

app.get('/generateKey', function(req, res) {
    res.send(makeKeyPair());
});
app.get('/entity', function(req, res) {
    getState(res);
});
app.get('/entity/:entity', function(req, res) {
    getStateByEntityName(req.params.entity, res);
});
app.get('/ID/:ID', function(req, res) {
    getIDDetails(req.params.ID, res);
});
app.post('/', function(req, res) {
    req.responseType = "blob";
    console.log("requestData", req);
    var action = req.body.action;
    var payloaddata = req.body.payloaddata;
    var private = req.body.private;
    submitUpdate({ action, payloaddata },
        private,
        res
    );
});

port = process.env.PORT || 8080;
// app.listen(port);
// console.log('todo list RESTful API server started on: ' + port);

var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("MedicineNet app listening at http://%s:%s", host, port)
})