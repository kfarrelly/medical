var mongoose=require ('mongoose');

Medicine = mongoose.Schema({
	serial: {
		type:String,	
    },
    medicine:{
        type:String,
    },
	MedicineCurrentTempurature:
	{
		 type:String,
	},
    location:{
        type:String,
    },
	
    weight:{
        type:String,
    },
    
	
	repoter: {
		type:String,	
	},
	parent: {
		type:String,
		default:'0'
	},
	role: {
		type:String,
		
	},
	MedicineId:{
		type:String,
	},
	time:{
		type:String,
    },
    status:{
        type:String,
    },
    userId:{
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
	plocalmaterialno:{
        type:String
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
	Mdate:{
        type:String,
    },
    Edate:{
        type:String,
    },
    localmaterialno:
	{
		type:String,
		default:'0'
    },
    barcode:{
        type:String,
        default:'0'
    },
});
var cmedicine= mongoose.model('newmedicine', Medicine);
module.exports={cmedicine};