const { createHash } = require('crypto')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')

class Medicine {
    constructor(FAMILY_NAME = 'medicine-chain', FAMILY_VERSION = '0.0') {
        this.FAMILY_NAME = FAMILY_NAME
        this.FAMILY_VERSION = FAMILY_VERSION
        this.PREFIX = createHash('sha512').update('medicine-chain').digest('hex').slice(0, 6) //this.getAddress(this.FAMILY_NAME, 6)
        this.Roles = Object.freeze({ "admin": 1, "manufacturer": 2, "wholesaler": 3, "distributer": 4, "pharma": 5, "batches": 6, "transporter": 7 })
        this.Status = Object.freeze({ "awarded": 1, "pickedup": 2, "intransact": 3, "delivered": 4, "return": 5 })
    }

    getAddress(key, length = 64) {
        return createHash('sha512').update(key).digest('hex').slice(0, length)
    }

    getUserID(userAddress, uesrRole) { return (this.PREFIX + "0" + uesrRole + this.getAddress(userAddress, 62)) }
    getMedicineID(serialNumber) { return (this.PREFIX + "06" + this.getAddress(serialNumber, 62)) }
    getBatchID(packageNumber, level) {
        return (this.PREFIX + "a" + level + this.getAddress(packageNumber, 62))
    }

    encode(obj) {
        return (Buffer.from(JSON.stringify(obj)))
    }
    decode(buf) {
        return (JSON.parse(buf.toString()))
    }

    createAdmin(admin, signer, state) {
        try {
            const AdminID = this.getUserID(signer, this.Roles.admin)
            return state.getState([AdminID])
                .then(entries => {
                    const entry = entries[AdminID]
                    if (entry && entry.length > 0) {
                        throw new InvalidTransaction('Admin already exists')
                    } else {

                        return state.setState({
                            [AdminID]: this.encode({
                                "admin": {
                                    "ID": AdminID,
                                    "name": admin.name,
                                    "location": JSON.stringify(admin.location),
                                    "email": admin.email
                                },
                                "user": {
                                    "active": true
                                },
                                "owner": signer
                            })
                        })
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }
    }

    updateAdminProfile(admin, signer, state) {
        try {
            const AdminID = this.getUserID(signer, this.Roles.admin)
            return state.getState([AdminID])
                .then(entries => {
                    const adminEntry = entries[AdminID]
                    if (!adminEntry || adminEntry.length === 0) {
                        throw new InvalidTransaction('Admin does not exist')
                    }
                    var AdminData = this.decode(adminEntry);
                    AdminData.admin.name = admin.name;
                    AdminData.admin.location = JSON.stringify(admin.location)
                    AdminData.admin.email = admin.email

                    return state.setState({
                        [AdminID]: this.encode(AdminData)
                    })
                })
                .catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    updateUserActive(admin, signer, state) {
        try {
            const AdminID = this.getUserID(signer, this.Roles.admin)
            const UserID = this.getUserID(admin.userPublicKey, admin.userRole)
            return state.getState([AdminID])
                .then(entries => {
                    const adminEntry = entries[AdminID]
                    if (!adminEntry || adminEntry.length === 0) {
                        throw new InvalidTransaction('Admin does not exist')
                    }
                    return state.getState([UserID])
                        .then(entries => {
                            const userEntry = entries[UserID]
                            if (!userEntry || userEntry.length === 0) {
                                throw new InvalidTransaction('User does not exist')
                            }
                            var UserData = this.decode(userEntry);
                            UserData.user.active = admin.userActive;

                            return state.setState({
                                [UserID]: this.encode(UserData)
                            })
                        }).catch(error => {
                            throw new InvalidTransaction(error.message)
                        })
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }
    }

    registerUsers(users, signer, state) {
        try {
            const AdminID = this.getUserID(signer, this.Roles.admin)
            const UserID = this.getUserID(users.publicKey, users.role)
            return state.getState([AdminID])
                .then(entries => {
                    const entry = entries[AdminID]
                    if (!entry || entry.length === 0) {
                        throw new InvalidTransaction('Admin does not exist')
                    }

                    if (signer !== this.decode(entry).owner) {
                        throw new InvalidTransaction('Only an Admin\'s can register users')
                    }
                    return state.getState([UserID])
                        .then(entriesUsers => {
                            const eUsers = entriesUsers[UserID]
                            if (eUsers.length > 0) {
                                throw new InvalidTransaction('User already register')
                            }
                            return state.setState({
                                [UserID]: this.encode({
                                    "user": {
                                        "ID": UserID,
                                        "name": users.name,
                                        "email": users.email,
                                        "contactNumber": users.contactNumber,
                                        "location": JSON.stringify(users.location),
                                        "publicKey": users.publicKey,
                                        "role": users.role,
                                        "active": true
                                    }
                                })
                            })

                        }).catch(error => {
                            throw new InvalidTransaction(error.message)
                        })
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)

        }

    }

    updateUserProfile(users, signer, state) {
        try {
            const UserID = this.getUserID(signer, users.role)
            return state.getState([UserID])
                .then(entries => {
                    const userEntry = entries[UserID]
                    if (!userEntry || userEntry.length === 0) {
                        throw new InvalidTransaction('User does not exist')
                    }
                    var UserData = this.decode(userEntry);
                    if (UserData.user.active) {
                        UserData.user.name = users.name;
                        UserData.user.email = users.email
                        UserData.user.contactNumber = users.contactNumber
                        UserData.user.location = JSON.stringify(users.location)

                        return state.setState({
                            [UserID]: this.encode(UserData)
                        })

                    } else {
                        throw new InvalidTransaction('User is not active')
                    }

                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }
    }

    // Manufacturer
    createMedicine(medicine, signer, state) {
        try {
            let UserID = "";
            if (medicine.admin) {
                UserID = this.getUserID(signer, this.Roles.admin)

            } else {

                UserID = this.getUserID(signer, this.Roles.manufacturer)
            }

            const MedicineID = this.getMedicineID(medicine.serialNumber)

            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Manufacturer!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry && medicineEntry.length > 0) {
                                    throw new InvalidTransaction('Serial Number alrady Exist!!')
                                }
                                data = {
                                    "MedicineID": MedicineID,
                                    "serialNumber": medicine.serialNumber,
                                    "description": medicine.description,
                                    "location": JSON.stringify(medicine.location),
                                    "uintDescription": JSON.stringify(medicine.uintDescription),
                                    "currentOwner": signer,
                                    "globalStatus": this.Roles.manufacturer,
                                    "parent": "",
                                    "attached": false,
                                    "owner": signer
                                }
                                return state.setState({
                                    [MedicineID]: this.encode(
                                        data
                                    )
                                })
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    // Manufacturer
    createPackages(packageDetails, signer, state) {
        try {
            let UserID = "";
            if (packageDetails.admin) {
                UserID = this.getUserID(signer, this.Roles.admin)

            } else {

                UserID = this.getUserID(signer, this.Roles.manufacturer)
            }
            const newPackageID = this.getBatchID(packageDetails.serialNumber, packageDetails.level)
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Exist!!')
                    }
                    if (this.decode(e_entry).user.active) {
                        if (packageDetails.admin || this.decode(e_entry).user.role == this.Roles.manufacturer) {

                            return state.getState([newPackageID])
                                .then(async entries => {
                                    var data = {};
                                    const medicineEntry = entries[newPackageID]
                                    if (medicineEntry && medicineEntry.length > 0) {
                                        throw new InvalidTransaction('Package Serial Number alrady Exist!!')
                                    }

                                    var inboundsInfo = {};
                                    for (var i = 0; i < packageDetails.inbounds.length; i++) {
                                        if (packageDetails.level == 0) {
                                            const MedicineID = this.getMedicineID(packageDetails.inbounds[i])
                                            var data = await state.getState([MedicineID])
                                            if (data[MedicineID].length === 0) {
                                                throw new InvalidTransaction(packageDetails.inbounds[i] + ' Medicine not Exist!!')
                                            } else {
                                                inboundsInfo[packageDetails.inbounds[i]] = this.decode(data[MedicineID]);
                                                if (inboundsInfo[packageDetails.inbounds[i]].parent != "") {
                                                    throw new InvalidTransaction(packageDetails.inbounds[i] + ": Already have parent")
                                                } else {
                                                    inboundsInfo[packageDetails.inbounds[i]].parent = packageDetails.serialNumber;
                                                    inboundsInfo[packageDetails.inbounds[i]].attached = true;
                                                }
                                            }

                                        } else if (packageDetails.level > 0) {
                                            const lowerLevelPackageID = this.getBatchID(packageDetails.inbounds[i], packageDetails.level - 1)
                                            var data = await state.getState([lowerLevelPackageID])
                                            if (data[lowerLevelPackageID].length === 0) {
                                                throw new InvalidTransaction(packageDetails.inbounds[i] + ' Package not Exist!!')
                                            } else {
                                                inboundsInfo[packageDetails.inbounds[i]] = this.decode(data[lowerLevelPackageID]);
                                                if (inboundsInfo[packageDetails.inbounds[i]].parent != "") {
                                                    throw new InvalidTransaction(packageDetails.inbounds[i] + ": Already have parent")
                                                } else {
                                                    inboundsInfo[packageDetails.inbounds[i]].parent = packageDetails.serialNumber;
                                                    inboundsInfo[packageDetails.inbounds[i]].attached = true;
                                                }
                                            }
                                        }
                                    }
                                    for (var i = 0; i < packageDetails.inbounds.length; i++) {
                                        var data = await state.setState({
                                            [inboundsInfo[packageDetails.inbounds[i]].MedicineID]: this.encode(
                                                inboundsInfo[packageDetails.inbounds[i]]
                                            )
                                        });
                                    }
                                    data = {
                                        "MedicineID": newPackageID,
                                        "serialNumber": packageDetails.serialNumber,
                                        "description": packageDetails.description,
                                        "location": JSON.stringify(packageDetails.location),
                                        "uintDescription": packageDetails.inbounds.length,
                                        "currentOwner": signer,
                                        "globalStatus": this.Roles.manufacturer,
                                        "child": packageDetails.inbounds,
                                        "split": false,
                                        "attached": false,
                                        "level": packageDetails.level,
                                        "parent": "",
                                        "owner": signer
                                    }
                                    return state.setState({
                                        [newPackageID]: this.encode(
                                            data
                                        )
                                    })
                                }).catch(error => {
                                    throw new InvalidTransaction(error.message)
                                })
                        } else {
                            throw new InvalidTransaction('User Neither Manufacturer nor Admin')
                        }
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }
    }

    // Package Owner
    openPackage(packageDetails, signer, state) {
        try {
            let UserID = "";
            if (packageDetails.admin) {
                UserID = this.getUserID(signer, this.Roles.admin)

            } else {

                UserID = this.getUserID(signer, packageDetails.userRole)
            }
            const newPackageID = this.getBatchID(packageDetails.serialNumber, packageDetails.level)
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Exist!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([newPackageID])
                            .then(async entries => {
                                var data = {};
                                const medicineEntry = entries[newPackageID]
                                if (!medicineEntry && medicineEntry.length == 0) {
                                    throw new InvalidTransaction('Package Serial Number not Exist!!')
                                }
                                var packageData = this.decode(medicineEntry);
                                if (packageData.currentOwner == signer || packageDetails.admin) {
                                    if (packageData.split) {
                                        throw new InvalidTransaction('Package was opened!!')
                                    }
                                    var inboundsPackages = packageData.child;
                                    var inboundsInfo = {};
                                    for (var i = 0; i < inboundsPackages.length; i++) {
                                        if (packageDetails.level == 0) {
                                            const MedicineID = this.getMedicineID(inboundsPackages[i])
                                            var data = await state.getState([MedicineID])
                                            inboundsInfo[inboundsPackages[i]] = this.decode(data[MedicineID]);
                                            inboundsInfo[inboundsPackages[i]].attached = false;
                                            inboundsInfo[inboundsPackages[i]].currentOwner = signer;
                                            inboundsInfo[inboundsPackages[i]].globalStatus = packageData.globalStatus;
                                            if(packageData.hasOwnProperty(this.Roles.wholesaler)){
                                                inboundsInfo[inboundsPackages[i]][this.Roles.wholesaler]= packageData[this.Roles.wholesaler];
                                            }
                                            if(packageData.hasOwnProperty(this.Roles.distributer)){
                                                inboundsInfo[inboundsPackages[i]][this.Roles.distributer]= packageData[this.Roles.distributer];
                                            } 
                                            if(packageData.hasOwnProperty(this.Roles.pharma)){
                                                inboundsInfo[inboundsPackages[i]][this.Roles.pharma]= packageData[this.Roles.pharma];
                                            }

                                        } else if (packageDetails.level > 0) {
                                            const lowerLevelPackageID = this.getBatchID(inboundsPackages[i], packageDetails.level - 1)
                                            var data = await state.getState([lowerLevelPackageID])
                                            inboundsInfo[inboundsPackages[i]] = this.decode(data[lowerLevelPackageID]);
                                            inboundsInfo[inboundsPackages[i]].attached = false;
                                            inboundsInfo[inboundsPackages[i]].currentOwner = signer;
                                            inboundsInfo[inboundsPackages[i]].globalStatus = packageData.globalStatus;
                                             if(packageData.hasOwnProperty(this.Roles.wholesaler)){
                                                inboundsInfo[inboundsPackages[i]][this.Roles.wholesaler]= packageData[this.Roles.wholesaler];
                                            }
                                            if(packageData.hasOwnProperty(this.Roles.distributer)){
                                                inboundsInfo[inboundsPackages[i]][this.Roles.distributer]= packageData[this.Roles.distributer];
                                            } 
                                            if(packageData.hasOwnProperty(this.Roles.pharma)){
                                                inboundsInfo[inboundsPackages[i]][this.Roles.pharma]= packageData[this.Roles.pharma];
                                            }
                                        }
                                    }
                                    // if (true) {
                                    //     throw new InvalidTransaction("SelftGen: " + packageData.toString() + ":: " + inboundsInfo.toString())
                                    // }
                                    for (var i = 0; i < inboundsPackages.length; i++) {
                                        var data = await state.setState({
                                            [inboundsInfo[inboundsPackages[i]].MedicineID]: this.encode(
                                                inboundsInfo[inboundsPackages[i]]
                                            )
                                        });
                                    }
                                    packageData.split = true;

                                    return state.setState({
                                        [newPackageID]: this.encode(
                                            packageData
                                        )
                                    })
                                } else {
                                    throw new InvalidTransaction("User Neither Current Owner of package nor Admin")
                                }
                            }).catch(error => {
                                throw new InvalidTransaction(error)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }
    }


    // Manufacturer
    sendToWholesaler(medicine, signer, state) {
        try {
            let UserID = "";
            let MedicineID = ""
            if (medicine.admin) {
                UserID = this.getUserID(signer, this.Roles.admin)

            } else {

                UserID = this.getUserID(signer, this.Roles.manufacturer)
            }
            // const UserID = this.getUserID(signer, this.Roles.manufacturer)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Exist!!')
                    }
                    if (this.decode(e_entry).user.active) {
                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (medicine.admin || (data.owner == signer && this.decode(e_entry).user.role == this.Roles.manufacturer)) {

                                    console.log(data, data.wholesaler);
                                    if (data.hasOwnProperty(this.Roles.wholesaler)) {
                                        if (data[this.Roles.wholesaler].status !== this.Status.return) {
                                            throw new InvalidTransaction('Batch Status: ' + data.wholesaler.status)
                                        } else {
                                            data[this.Roles.wholesaler].address = medicine.wholesaler.address
                                            data[this.Roles.wholesaler].comment = medicine.wholesaler.comment
                                            if (data[this.Roles.wholesaler].transporterid == medicine.transporterid) {
                                                data[this.Roles.wholesaler].status = this.Status.pickedup
                                            } else {
                                                data[this.Roles.wholesaler].transporterid = medicine.transporterid
                                                data[this.Roles.wholesaler].status = this.Status.awarded
                                            }
                                        }
                                    } else {
                                        data[this.Roles.wholesaler] = {};
                                        data[this.Roles.wholesaler]["address"] = medicine.wholesaler.address
                                        data[this.Roles.wholesaler]["comment"] = medicine.wholesaler.comment
                                        data[this.Roles.wholesaler]["transporterid"] = medicine.transporterid
                                        data[this.Roles.wholesaler]["status"] = this.Status.awarded
                                    }

                                    return state.setState({
                                        [MedicineID]: this.encode(
                                            data
                                        )
                                    })
                                } else {
                                    throw new InvalidTransaction('User Neither Valid Sender[Manufacturer] nor Admin')
                                }

                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active or manufacturer')
                    }
                }).catch(function(err) {
                    throw new InvalidTransaction(err)

                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    pickPackage(medicine, signer, state) {
        try {

            const UserID = this.getUserID(signer, this.Roles.transporter)
            let MedicineID = ""; // this.getMedicineID(medicine.serialNumber)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Exist!!')
                    }
                    if (this.decode(e_entry).user.active) {
                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (data.hasOwnProperty(`${data.globalStatus + 1}`)) {
                                    if (data[`${data.globalStatus + 1}`].status !== this.Status.awarded) {
                                        throw new InvalidTransaction('Batch Status: ' + data[`${data.globalStatus + 1}`].status)
                                    } else if (data[`${data.globalStatus + 1}`].transporterid !== UserID) {
                                        throw new InvalidTransaction('Not Assigned transporter')
                                    } else {
                                        data[`${data.globalStatus + 1}`].comment = medicine.comment
                                        data[`${data.globalStatus + 1}`].status = this.Status.pickedup
                                        data.currentOwner = signer;
                                        return state.setState({
                                            [MedicineID]: this.encode(
                                                data
                                            )
                                        })
                                    }
                                } else {
                                    throw new InvalidTransaction('Batch Status: ' + data.globalStatus);
                                }
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    // Wholesaler
    recieveFromManufecturer(medicine, signer, state) {
        try {
            const UserID = this.getUserID(signer, this.Roles.wholesaler)
            let MedicineID = ""; // this.getMedicineID(medicine.serialNumber)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Wholesaler!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (data[this.Roles.wholesaler] !== 'undefined' && signer != data[this.Roles.wholesaler].address) {
                                    throw new InvalidTransaction('Not valid assigned Wholesaler!!')
                                }

                                if (data[this.Roles.wholesaler].status > this.Status.intransact) {
                                    throw new InvalidTransaction('Batch Status: ' + data[this.Roles.wholesaler].status)
                                } else {
                                    data[this.Roles.wholesaler].comment = medicine.comment
                                    data[this.Roles.wholesaler].status = medicine.status
                                    if (medicine.status === this.Status.delivered) {
                                        data.globalStatus = this.Roles.wholesaler
                                        data.currentOwner = signer
                                    }
                                }

                                return state.setState({
                                    [MedicineID]: this.encode(
                                        data
                                    )
                                })
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    // Wholesaler
    sendToDistributer(medicine, signer, state) {
        try {
            let UserID = "";
            if (medicine.admin) {
                UserID = this.getUserID(signer, this.Roles.admin)

            } else {

                UserID = this.getUserID(signer, this.Roles.wholesaler)
            }
            let MedicineID = ""; // this.getMedicineID(medicine.serialNumber)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            // const UserID = this.getUserID(signer, this.Roles.wholesaler)
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Wholesaler!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (data.hasOwnProperty(this.Roles.wholesaler)&&(data[this.Roles.wholesaler].address == signer) || medicine.admin) {

                                    if (data[this.Roles.wholesaler].status !== this.Status.delivered) {
                                        throw new InvalidTransaction('Serial Number not in inventory!! ' + data[this.Roles.wholesaler].status + "::" + this.Status.delivered)
                                    }
                                    if (data.hasOwnProperty(this.Roles.distributer)) {
                                        if (data[this.Roles.distributer].status !== this.Status.return) {
                                            throw new InvalidTransaction('Batch Status: ' + data.distributer.status)
                                        } else {
                                            data[this.Roles.distributer].address = medicine.distributer.address
                                            data[this.Roles.distributer].comment = medicine.distributer.comment
                                            if (data[this.Roles.distributer].transporterid == medicine.transporterid) {
                                                data[this.Roles.distributer].status = this.Status.pickedup
                                            } else {
                                                data[this.Roles.distributer].transporterid = medicine.transporterid
                                                data[this.Roles.distributer].status = this.Status.awarded
                                            }
                                        }
                                    } else {
                                        data[this.Roles.distributer] = {};
                                        data[this.Roles.distributer]["address"] = medicine.distributer.address
                                        data[this.Roles.distributer]["comment"] = medicine.distributer.comment
                                        data[this.Roles.distributer]["transporterid"] = medicine.transporterid
                                        data[this.Roles.distributer]["status"] = this.Status.awarded
                                    }

                                    return state.setState({
                                        [MedicineID]: this.encode(
                                            data
                                        )
                                    })
                                } else {
                                    throw new InvalidTransaction('User Neither Sender[Wholesaler] nor Admin')
                                }
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    // Distributer
    recieveFromWholesaler(medicine, signer, state) {
        try {
            const UserID = this.getUserID(signer, this.Roles.distributer)
            let MedicineID = ""; // this.getMedicineID(medicine.serialNumber)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Distributer!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (data[this.Roles.distributer] !== 'undefined' && signer != data[this.Roles.distributer].address) {
                                    throw new InvalidTransaction('Not valid assigned distributer!!')
                                }

                                if (data[this.Roles.distributer].status > this.Status.intransact) {
                                    throw new InvalidTransaction('Batch Status: ' + data[this.Roles.distributer].status)
                                } else {
                                    data[this.Roles.distributer].comment = medicine.comment
                                    data[this.Roles.distributer].status = medicine.status
                                    if (medicine.status === this.Status.delivered) {
                                        data.globalStatus = this.Roles.distributer
                                        data.currentOwner = signer
                                    }
                                }

                                return state.setState({
                                    [MedicineID]: this.encode(
                                        data
                                    )
                                })
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    // Distributer
    sendToPharma(medicine, signer, state) {
        try {
            let UserID = "";
            if (medicine.admin) {
                UserID = this.getUserID(signer, this.Roles.admin)

            } else {

                UserID = this.getUserID(signer, this.Roles.distributer)
            }
            // const UserID = this.getUserID(signer, this.Roles.distributer)
            let MedicineID = ""; // this.getMedicineID(medicine.serialNumber)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Distributer!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (data.hasOwnProperty(this.Roles.distributer) & (data[this.Roles.distributer].address == signer )|| medicine.admin) {

                                    if (data[this.Roles.distributer].status !== this.Status.delivered) {
                                        throw new InvalidTransaction('Serial Number not in inventory!!')
                                    }
                                    if (data.hasOwnProperty(this.Roles.pharma)) {
                                        if (data[this.Roles.pharma].status !== this.Status.return) {
                                            throw new InvalidTransaction('Batch Status: ' + data.pharma.status)
                                        } else {
                                            data[this.Roles.pharma].address = medicine.pharma.address
                                            data[this.Roles.pharma].comment = medicine.pharma.comment
                                            if (data[this.Roles.pharma].transporterid == medicine.transporterid) {
                                                data[this.Roles.pharma].status = this.Status.pickedup
                                            } else {
                                                data[this.Roles.pharma].transporterid = medicine.transporterid
                                                data[this.Roles.pharma].status = this.Status.awarded
                                            }
                                        }
                                    } else {
                                        data[this.Roles.pharma] = {};
                                        data[this.Roles.pharma]["address"] = medicine.pharma.address
                                        data[this.Roles.pharma]["comment"] = medicine.pharma.comment
                                        data[this.Roles.pharma]["transporterid"] = medicine.transporterid
                                        data[this.Roles.pharma]["status"] = this.Status.awarded
                                    }

                                    return state.setState({
                                        [MedicineID]: this.encode(
                                            data
                                        )
                                    })
                                } else {
                                    throw new InvalidTransaction('User Neither Sender[Distributer] nor Admin')
                                }
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    // Pharma
    recieveFromDistributer(medicine, signer, state) {
        try {
            const UserID = this.getUserID(signer, this.Roles.pharma)
            let MedicineID = ""; // this.getMedicineID(medicine.serialNumber)
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([UserID])
                .then(entries => {
                    const e_entry = entries[UserID]
                    if (!e_entry || e_entry.length === 0) {
                        throw new InvalidTransaction('User is not Pharma!!')
                    }
                    if (this.decode(e_entry).user.active) {

                        return state.getState([MedicineID])
                            .then(entries => {
                                var data = {};
                                const medicineEntry = entries[MedicineID]
                                if (medicineEntry.length === 0) {
                                    throw new InvalidTransaction('Serial Number not Exist!!')
                                }
                                var data = this.decode(medicineEntry);
                                if (medicine.level >= 0 && data.split) {
                                    throw new InvalidTransaction('Package was opened!!')
                                }
                                if (data[this.Roles.pharma] !== 'undefined' && signer != data[this.Roles.pharma].address) {
                                    throw new InvalidTransaction('Not valid assigned pharma!!')
                                }

                                if (data[this.Roles.pharma].status > this.Status.intransact) {
                                    throw new InvalidTransaction('Batch Status: ' + data[this.Roles.pharma].status)
                                } else {
                                    data[this.Roles.pharma].comment = medicine.comment
                                    data[this.Roles.pharma].status = medicine.status
                                    if (medicine.status === this.Status.delivered) {
                                        data.globalStatus = this.Roles.pharma
                                        data.currentOwner = signer
                                    }
                                }
                                return state.setState({
                                    [MedicineID]: this.encode(
                                        data
                                    )
                                })
                            }).catch(error => {
                                throw new InvalidTransaction(error.message)
                            })
                    } else {
                        throw new InvalidTransaction('User is not active')
                    }
                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

    medicineStatusUpdate(medicine, signer, state) {
        try {
            let MedicineID = "";
            if (medicine.level >= 0) {
                MedicineID = this.getBatchID(medicine.serialNumber, medicine.level)
            } else {
                MedicineID = this.getMedicineID(medicine.serialNumber)
            }
            return state.getState([MedicineID])
                .then(entries => {
                    var data = {};
                    const medicineEntry = entries[MedicineID]
                    if (medicineEntry.length === 0) {
                        throw new InvalidTransaction('Serial Number not Exist!!')
                    }
                    var data = this.decode(medicineEntry);
                    if (data.split) {
                        throw new InvalidTransaction('Package is Open')
                    }
                    if (!data.attached) {
                        if (signer === data.currentOwner) {
                            const UserID = this.getUserID(signer, medicine.userRole)
                            return state.getState([UserID])
                                .then(entries => {
                                    const e_entry = entries[UserID]
                                    if (!e_entry || e_entry.length === 0) {
                                        throw new InvalidTransaction('User is not Registered!!')
                                    }
                                    if (this.decode(e_entry).user.active) {

                                        if (!data.hasOwnProperty('physicalState')) {
                                            data["physicalState"] = [];
                                            // data.physicalState.comment = medicine.comment
                                            // data.physicalState.temperature =medicine.temperature
                                        }
                                        data.physicalState.push({
                                            "updator": signer,
                                            "state": JSON.stringify(medicine.physicalState)
                                        })
                                        return state.setState({
                                            [MedicineID]: this.encode(
                                                data
                                            )
                                        })
                                    } else {
                                        throw new InvalidTransaction('User is not active!!')
                                    }
                                }).catch(error => {
                                    throw new InvalidTransaction(error.message)
                                })
                        } else {
                            const AdminID = this.getUserID(signer, this.Roles.admin)
                            return state.getState([AdminID])
                                .then(entries => {
                                    const entry = entries[AdminID]
                                    if (entry && entry.length > 0) {
                                        if (!data.hasOwnProperty('physicalState')) {
                                            data["physicalState"] = [];
                                            // data.physicalState.comment = medicine.comment
                                            // data.physicalState.temperature =medicine.temperature
                                        }
                                        data.physicalState.push({
                                            "updator": signer,
                                            "state": JSON.stringify(medicine.physicalState)
                                        })
                                        return state.setState({
                                            [MedicineID]: this.encode(
                                                data
                                            )
                                        })
                                    } else {
                                        throw new InvalidTransaction('Not assigned owner!!')
                                    }
                                }).catch(error => {
                                    throw new InvalidTransaction(error.message)
                                })
                        }
                    } else {
                        throw new InvalidTransaction('Medicine/Package attached to parent!!')
                    }

                }).catch(error => {
                    throw new InvalidTransaction(error.message)
                })
        } catch (error) {
            throw new InvalidTransaction(error.message)
        }

    }

}
module.exports = Medicine;