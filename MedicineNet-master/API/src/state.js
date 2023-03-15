// SPDX-License-Identifier: Apache-2.0

/*
This code was written by Zac Delventhal @delventhalz.
Original source code can be found here: https://github.com/delventhalz/transfer-chain-js/blob/master/client/src/state.js
 */

'use strict'
const Roles = { 1: "admin", 2: "manufacturer", 3: "wholesaler", 4: "distributer", 5: "pharma", 6: "batches", 7: "transporter" };

const $ = require('jquery')
const request = require('request')
var atob = require('atob');
const { createHash } = require('crypto')
const protobuf = require('sawtooth-sdk/protobuf')
const {
    createContext,
    Signer
} = require('sawtooth-sdk/signing')
const secp256k1 = require('sawtooth-sdk/signing/secp256k1')

// Config variables
const KEY_NAME = 'medicine-chain.keys'
const API_URL = 'http://localhost:8000/api'


const FAMILY = 'medicine-chain'
const VERSION = '0.0'
const PREFIX = '925160'

// Fetch key-pairs from localStorage
const getKeys = () => {
    const storedKeys = localStorage.getItem(KEY_NAME)
    if (!storedKeys) return []

    return storedKeys.split(';').map((pair) => {
        const separated = pair.split(',')
        return {
            public: separated[0],
            private: separated[1]
        }
    })
}

// Create new key-pair
const makeKeyPair = () => {
        const context = createContext('secp256k1')
        const privateKey = context.newRandomPrivateKey()
        console.log(privateKey);
        recoverPvtKey(privateKey.asHex());
        return {
            public: context.getPublicKey(privateKey).asHex(),
            private: privateKey.asHex(),
            privateKey
        }
    }
    // recover pvt
const recoverPvtKey = (pvtKey) => {
        console.log()
        var privateKey = { "privateKeyBytes": Buffer.from(pvtKey, 'hex') }
        console.log("Recovered Keys Private Key: ", privateKey)
        const context = createContext('secp256k1')

        var regenratedPublicKey = context.getPublicKey(privateKey).asHex()
        console.log("Recovered Keys: ", pvtKey, regenratedPublicKey);
    }
    // Save key-pairs to localStorage
const saveKeys = keys => {
    const paired = keys.map(pair => [pair.public, pair.private].join(','))
    localStorage.setItem(KEY_NAME, paired.join(';'))
}

// Fetch current Sawtooth Tuna Chain state from validator
const getState = (cb) => {
    request.get(`${API_URL}/state?address=${PREFIX}`, function(error, response, body) {
        if (!error) {
            var datum = JSON.parse(JSON.constructor(body));
            console.log(datum);
            var processed = {
                "manufacturer": [],
                "wholesaler": [],
                "distributer": [],
                "pharma": [],
                "transporter": [],
                "medicine": [],
                "batches": []
            }
            if (datum.data !== '') {
                for (var i = 0; i < datum.data.length; i++) {
                    var decodeData = JSON.parse(atob(datum.data[i].data))
                    console.log(decodeData)
                    console.log(datum.data[i].address[7], decodeData.hasOwnProperty('user'))
                        // decodeData.location = JSON.parse(decodeData.location);
                    if (decodeData.hasOwnProperty('user') && datum.data[i].address[7] != '1') {
                        console.log("location: ", decodeData.user)
                        decodeData.user.location = JSON.parse(decodeData.user.location);
                    }
                    if (datum.data[i].address[7] === '2') processed.manufacturer.push(decodeData)
                    if (datum.data[i].address[7] === '3') processed.wholesaler.push(decodeData)
                    if (datum.data[i].address[7] === '4') processed.distributer.push(decodeData)
                    if (datum.data[i].address[7] === '5') processed.pharma.push(decodeData)
                    if (datum.data[i].address[7] === '6') {
                        decodeData.uintDescription = JSON.parse(decodeData.uintDescription);
                        decodeData.location = JSON.parse(decodeData.location);
                        if (decodeData.hasOwnProperty('physicalState')) {
                            for (let letter of decodeData.physicalState.entries()) {
                                console.log(letter)
                                letter[1].state = JSON.parse(letter[1].state)
                            }
                        }

                        if (decodeData.hasOwnProperty('3')) {
                            decodeData[Roles['3']] = decodeData['3']
                            delete decodeData['3']
                        }
                        if (decodeData.hasOwnProperty('4')) {
                            decodeData[Roles['4']] = decodeData['4']
                            delete decodeData['4']
                        }
                        if (decodeData.hasOwnProperty('5')) {
                            decodeData[Roles['5']] = decodeData['5']
                            delete decodeData['5']
                        }
                        processed.medicine.push(decodeData)
                    }
                    if (datum.data[i].address[6] === 'a') {
                        decodeData.uintDescription = JSON.parse(decodeData.uintDescription);
                        decodeData.location = JSON.parse(decodeData.location);
                        if (decodeData.hasOwnProperty('physicalState')) {
                            for (let letter of decodeData.physicalState.entries()) {
                                console.log(letter)
                                letter[1].state = JSON.parse(letter[1].state)
                            }
                        }

                        if (decodeData.hasOwnProperty('3')) {
                            decodeData[Roles['3']] = decodeData['3']
                            delete decodeData['3']
                        }
                        if (decodeData.hasOwnProperty('4')) {
                            decodeData[Roles['4']] = decodeData['4']
                            delete decodeData['4']
                        }
                        if (decodeData.hasOwnProperty('5')) {
                            decodeData[Roles['5']] = decodeData['5']
                            delete decodeData['5']
                        }
                        processed.batches.push(decodeData)
                    }
                    if (datum.data[i].address[7] === '7') processed.transporter.push(decodeData)
                }
            }
            // console.log("processed", processed)
            cb.send(processed);
        } else {
            console.log('error', error, response && response.statusCode);
            cb.send({ error, response })
        }
    })
}
const getStateByEntityName = (entity, cb) => {
    const dataName = entity;
    if (entity == 'manufacturer') entity = '02';
    if (entity == 'wholesaler') entity = '03';
    if (entity == 'distributer') entity = '04';
    if (entity == 'pharma') entity = '05';
    if (entity == 'medicine') entity = '06';

    request.get(`${API_URL}/state?address=${PREFIX}${entity}`, function(error, response, body) {
        if (!error) {
            console.log("102", body)
            var datum = JSON.parse(JSON.constructor(body));
            console.log(datum);
            var processed = {}
            processed[dataName] = [];
            if (datum.data !== '') {
                for (var i = 0; i < datum.data.length; i++) {
                    var decodeData = JSON.parse(atob(datum.data[i].data))
                    if (decodeData.hasOwnProperty('3')) {
                        decodeData[Roles['3']] = decodeData['3']
                        delete decodeData['3']
                    }
                    if (decodeData.hasOwnProperty('4')) {
                        decodeData[Roles['4']] = decodeData['4']
                        delete decodeData['4']
                    }
                    if (decodeData.hasOwnProperty('5')) {
                        decodeData[Roles['5']] = decodeData['5']
                        delete decodeData['5']
                    }

                    processed[dataName].push(decodeData)

                }
            }
            console.log("processed", processed)
            cb.send(processed);
        } else {
            console.log('error', error, response && response.statusCode);
            cb.send({ error, response })
        }
    })
}

const getIDDetails = (address, cb) => {
        request.get(`${API_URL}/state?address=${address}`, function(error, response, body) {
            if (!error) {
                console.log("102", body)
                var datum = JSON.parse(JSON.constructor(body));
                console.log(datum);
                var processed = {}
                processed[address] = [];
                if (datum.data !== '') {
                    for (var i = 0; i < datum.data.length; i++) {
                        var decodeData = JSON.parse(atob(datum.data[i].data))
                        processed[address].push(decodeData)

                    }
                }
                console.log("processed", processed)
                cb.send(processed);
            } else {
                console.log('error', error, response && response.statusCode);
                cb.send({ error, response })
            }
        })
    }
    // Submit signed Transaction to validator
const submitUpdate = (payload, privateKeyHex, cb) => {
    // Create signer
    console.log("data", payload, "\n TF::", !payload["owner"])
    const context = createContext('secp256k1')
    const privateKey = secp256k1.Secp256k1PrivateKey.fromHex(privateKeyHex)
    const signer = new Signer(context, privateKey)
    if (!payload["owner"]) {
        payload["owner"] = signer.getPublicKey().asHex().toString();
        console.log("data", payload)

    }
    // Create the TransactionHeader
    const payloadBytes = Buffer.from(JSON.stringify(payload))
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: FAMILY,
        familyVersion: VERSION,
        inputs: [PREFIX],
        outputs: [PREFIX],
        signerPublicKey: signer.getPublicKey().asHex(),
        batcherPublicKey: signer.getPublicKey().asHex(),
        dependencies: [],
        payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
    }).finish()

    // Create the Transaction
    const transactionHeaderSignature = signer.sign(transactionHeaderBytes)

    const transaction = protobuf.Transaction.create({
        header: transactionHeaderBytes,
        headerSignature: transactionHeaderSignature,
        payload: payloadBytes
    })

    // Create the BatchHeader
    const batchHeaderBytes = protobuf.BatchHeader.encode({
        signerPublicKey: signer.getPublicKey().asHex(),
        transactionIds: [transaction.headerSignature]
    }).finish()

    // Create the Batch
    const batchHeaderSignature = signer.sign(batchHeaderBytes)

    const batch = protobuf.Batch.create({
        header: batchHeaderBytes,
        headerSignature: batchHeaderSignature,
        transactions: [transaction]
    })

    // Encode the Batch in a BatchList
    const batchListBytes = protobuf.BatchList.encode({
        batches: [batch]
    }).finish()

    var req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        processData: false,
        body: batchListBytes
    };

    request.post(`${API_URL}/batches`, req,
        function(error, response, body) {
            if (!error) {
                var id = body.link().split('?')[1].split('\"')[0];
                request.get(`${API_URL}/batch_statuses?${id}&wait`, function(error, response, body) {
                    if (!error) {
                        cb.send({ "id": id, "response": response });
                    }
                })
            } else {
                console.log('error', error, response && response.statusCode);
                cb.send({ error, response })
            }
        }
    )
}

module.exports = {
    getKeys,
    makeKeyPair,
    saveKeys,
    getState,
    submitUpdate,
    getStateByEntityName,
    getIDDetails
}