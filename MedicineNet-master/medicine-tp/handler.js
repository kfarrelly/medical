'use strict'

const { createHash } = require('crypto')
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')
const protobuf = require('sawtooth-sdk/protobuf')
const Medicine = require('./medicine');
var MedicineInstance = new Medicine();

class MedicineHandler extends TransactionHandler {
    constructor() {
        super(MedicineInstance.FAMILY_NAME, [MedicineInstance.FAMILY_VERSION], [MedicineInstance.PREFIX])
    }

    apply(txn, context) {
        const header = txn.header //protobuf.TransactionHeader.decode(txn.header)  
        const signer = header.signerPublicKey
        const { action, payloaddata, owner } = JSON.parse(txn.payload)
        const state = context;
        console.log("handler:32", payloaddata)
        console.log(`Handling transaction:  ${action} > ${payloaddata}`,
            owner ? `> ${owner.slice(0, 8)}... ` : '',
            `:: ${signer.slice(0, 8)}...`)

        if (action === 'createAdmin') return MedicineInstance.createAdmin(payloaddata, signer, state)
        if (action === 'registerUsers') return MedicineInstance.registerUsers(payloaddata, signer, state)
        if (action === 'createMedicine') return MedicineInstance.createMedicine(payloaddata, signer, state)
        if (action === 'sendToWholesaler') return MedicineInstance.sendToWholesaler(payloaddata, signer, state)
        if (action === 'recieveFromManufecturer') return MedicineInstance.recieveFromManufecturer(payloaddata, signer, state)
        if (action === 'sendToDistributer') return MedicineInstance.sendToDistributer(payloaddata, signer, state)
        if (action === 'recieveFromWholesaler') return MedicineInstance.recieveFromWholesaler(payloaddata, signer, state)
        if (action === 'sendToPharma') return MedicineInstance.sendToPharma(payloaddata, signer, state)
        if (action === 'recieveFromDistributer') return MedicineInstance.recieveFromDistributer(payloaddata, signer, state)
        if (action === 'medicineStatusUpdate') return MedicineInstance.medicineStatusUpdate(payloaddata, signer, state)
        if (action === 'pickPackage') return MedicineInstance.pickPackage(payloaddata, signer, state)
        if (action === 'updateAdminProfile') return MedicineInstance.updateAdminProfile(payloaddata, signer, state)
        if (action === 'updateUserProfile') return MedicineInstance.updateUserProfile(payloaddata, signer, state)
        if (action === 'updateUserActive') return MedicineInstance.updateUserActive(payloaddata, signer, state)
        if (action === 'createPackages') return MedicineInstance.createPackages(payloaddata, signer, state)
        if (action === 'openPackage') return MedicineInstance.openPackage(payloaddata, signer, state)


        return Promise.resolve().then(() => {
            throw new InvalidTransaction(
                'Action must be "createAdmin", "registerUsers", "createMedicine","pickPackage",sendToWholesaler", "recieveFromManufecturer", "sendToDistributer", "recieveFromWholesaler","sendToPharma","recieveFromDistributer", "medicineStatusUpdate", "updateAdminProfile", "updateUserActive" "OR" updateUserProfile"'
            )
        })
    }
}

module.exports = {
    MedicineHandler
}