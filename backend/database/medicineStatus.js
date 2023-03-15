var mongoose=require ('mongoose');

MedicineStatus = mongoose.Schema({
	serial: {
		type:String,	
	
    },
    medicine:{
        type:String,
    },
    barcode:{
        type:String,
    },
    location:{
        type:String,
    },
    weight:{
        type:String,
    },
    Edate:{
        type:String,
    },
  Mdate:{
        type:String,
    },
	MedicineId: {
		type:String,	
	},
	
	role: {
		type:String,
		
	},	
	time:{
		type:String,
    },    
    status:{
            type:String,
        },
        customern:{ 
            type:String
        },
            customername:{ 
                type:String,
            },
            shipton:{ 
                type:String,
            },
            countrycode:{ 
                type:String,
            },
            shiptoparty: { 
                type:String,
            },
            pharmadeliveryno: { 
                type:String,
            },
            salesorderendcustomer: { 
                type:String,
            },
            purchaseorderendcustomer: { 
                type:String,
            },
            shippedquantity: { 
                type:String,
            },
            unit: { 
                type:String,
            },
            aproductname: { 
                type:String,
            },
            dosageform: { 
                type:String,
            },
            packagetype: { 
                type:String,
            },
            packagesize: { 
                type:String,
            },
            globelmaterialno: { 
                type:String,
            },
            batchn: { 
                type:String,
            },
            dateofmanufecture: { 
                type:String,
            },
            releasedate: { 
                type:String,
            },
            expirydate: { 
                type:String,
            },
            productionqty: { 
                type:String,
            },
            pproductname: { 
                type:String,
            },
            pglobelmaterialno: { 
                type:String,
            },
            apackagingsite: { 
                type:String,
            },
            manufacturinglicense: { 
                type:String,
            },
            gmvcertificateno: { 
                type:String,
            },
            certificateno: { 
                type:String,
            },
            productn: { 
                type:String,
            },
            globalmaterialn: { 
                type:String,
            },
            localmaterialn: { 
                type:String,
            },
            areleasedate: { 
                type:String,
            },
            abatchn: { 
                type:String,
            },
            amanufacturingsite: { 
                type:String,
            },
            amanufacturinglicense: { 
                type:String,
            },
    
	
});
var newMedicineStatus= mongoose.model('newMedicineStatus', MedicineStatus);
module.exports={newMedicineStatus};