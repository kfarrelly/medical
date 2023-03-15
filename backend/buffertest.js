const recoverPvtKey = (pvtKey) => {
	        console.log('finalPprivateKey',pvtKey)

        var privateKey1 = Buffer.from(pvtKey, 'hex')
        console.log('privatekey',privateKey1)
        //const context = createContext('secp256k1')

        //var regenratedPublicKey = context.getPublicKey(privateKey1).asHex()
        //console.log('new publickey', regenratedPublicKey);
    }
	recoverPvtKey('1531d9f3cf2e548257152136c2e0e69166aacf56107c597c8f74bd55fcadaef6')
