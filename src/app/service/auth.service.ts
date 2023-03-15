import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { UserLog } from '../user/mylogin/userlog';
import { register } from '../user/signup/signuplog';
import { newUser } from '../admin/dashboard/create-user/newuser';
import { Medicine } from '../admin/medicine/medicine-create/addmedicine';
import { Package } from '../admin/medicine/package-create/addpackage';
import { Medicine2 } from '../admin/medicine/medicine-create/addmedicine2';
import { Package2 } from '../admin/medicine/package-create/addpackage2';
import { Wholesaler } from '../admin/dashboard/wholesaler/wholesaler';
import { Distrubuter } from '../admin/dashboard/distrubuter/dist';
import { Pharma } from '../admin/dashboard/pharma/pharma';
import { Manufacture } from '../admin/dashboard/manufacturer/manufacture';
import { Transporter } from '../admin/dashboard/transporter/transporter';
import { Transection } from '../admin/medicine/medicine-list/transection';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  uri = "http://84.22.96.222:10000";
  usereamil;
  logout: string;
  publickey:string;
  userId:any;

  // ----Logout
  lout() {
    this.logout = localStorage.getItem("x-token");
    localStorage.removeItem("x-token");
    return this.http.post("http://84.22.96.222:10000/logOut", {
      token: this.logout
    });
  }
  //---Logouut End

  //signin to first table end
  signin: register;
  signup(signin) {
    // console.log(signin);
    return this.http.post("http://84.22.96.222:10000/signup", signin);
  }
//signin to first table end

// signin to second table
  sign: register;
  saveSignup(sign) {
    console.log('service',sign);
    // console.log(signin);
    return this.http.post("http://84.22.96.222:10000/signup2", sign);
  }
  //signin to second table end

  //login api
  userlog(ulog: UserLog): Observable<HttpResponse<UserLog>> {
    return this.http.post<UserLog>("http://84.22.96.222:10000/login", ulog, {
      observe: "response"
    });
  }
  // login api end

  //token
  setTkn(tok: string) {
    localStorage.setItem("x-token", tok);
  }
  // token end
  //get token
  getTkn() {
    return localStorage.getItem("x-token");
  }
  //get token end




  // newuser start
  createuser(createuser: newUser) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/newuser",
     createuser,{params:{email:this.usereamil}}
    );
  }
  //newuser end

  // new wholesaler start
  wholesaler(createwholesaler: Wholesaler) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/postWholesaler",
      createwholesaler,{params:{email:this.usereamil}}
    );
  }
  // new wholesaler end

  //Distributer Start

  distributer(createdistributer: Distrubuter) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/postDistrubuter",
      createdistributer,{params:{email:this.usereamil}}
    );
  }

  //Distributer End

  //Pharma Start

  pharma(createpharma: Pharma) { 
    this.usereamil = localStorage.getItem("email");   
    return this.http.post(
      "http://84.22.96.222:10000/postPharma",
      createpharma,{params:{email:this.usereamil}}
    );
  }

  //Pharma End

  //Distributor Start
  distributorqr(email) { 
    const object={
      'email':email
    }
    this.usereamil = localStorage.getItem("email");   
    return this.http.post(`${this.uri}/sendResetMail`,object);
    
  }
  wholesalerqr(eid,pass,actcode){
    const object={
      'email':eid,
      'password':pass,
	  'actcode':actcode
    }
       
    return this.http.post(`${this.uri}/resetPassword`,object);

  }

  //manufacture Start
  manufacture(createmanufacture: Manufacture) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/postManufacture",
      createmanufacture,{params:{email:this.usereamil}}
    );
  }

  //manufacture End

 //transporter Start
  transporter(createtransporter: Medicine2) {
    this.usereamil = localStorage.getItem("email");
    console.log(createtransporter);
    return this.http.post(
      "http://84.22.96.222:10000/postTransporter",
      createtransporter,{params:{email:this.usereamil}}
    );
  }

  //transporter End
  
  
  //transporter Start
  packagetransporter(createtransporter: Package2) {
    this.usereamil = localStorage.getItem("email");
    console.log(createtransporter);
    return this.http.post(
      "http://84.22.96.222:10000/postPackageTransporter",
      createtransporter,{params:{email:this.usereamil}}
    );
  }

  //transporter End 
  
  createmedicine(createmedicine: Medicine) {
    
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/newmedicine",
      createmedicine,{params:{email:this.usereamil}}
    );
  }
  
  createpackage(createpackage: Package) {
    
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/newpackage",
      createpackage,{params:{email:this.usereamil}}
    );
  }
  
  
  
   createmedicine2(createmedicine2: Medicine2) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/medicineStatusUpdate",
      createmedicine2,{params:{email:this.usereamil}}
    );
  }
  
  createpackage2(createpackage2: Package2) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/medicineStatusUpdate",
      createpackage2,{params:{email:this.usereamil}}
    );
  }
  
   medicineTransection(transection: Transection) {
    this.usereamil = localStorage.getItem("email");
    return this.http.post(
      "http://84.22.96.222:10000/transection1",
      transection,{params:{email:this.usereamil}}
    );
  }
  
  
   getMedicineTransection() {
    this.userId = localStorage.getItem("userId");
    console.log('server side userid',this.userId)
    const obj = {
			id: this.userId    
    };
    return this.http.post("http://84.22.96.222:10000/gettransection",obj);
  }

  getRecieveMedicineTransection() {
    this.userId = localStorage.getItem("userId");
	this.publickey  = localStorage.getItem("publicKey");
    console.log('server side userid',this.userId)
    const obj = {
			id: this.userId,
			key:this.publickey
    };
    return this.http.post("http://84.22.96.222:10000/getrecievetransection",obj);
  }

  /***************************get apis *********************************** */
  
  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
       return false;
    }
    return true;
}

  //get user publickey
  getpublickey(key){	  
	   const obj = {
			pkey: key    
    };	   
  return this.http.post(`${this.uri}/keymatch`, obj);
}
  
getallUser(){
  return this.http.get(`${this.uri}/allUser`);
}

getallWholesalerUser(){
  return this.http.get(`${this.uri}/getwholesalerUser`);
}

getallTransporterUser(){
  return this.http.get(`${this.uri}/getTransporterUser`);
}
getallDistributerUser(){
  return this.http.get(`${this.uri}/getDistributerUser`);
}
getallPharmaUser(){
  return this.http.get(`${this.uri}/getPharmaUser`);
}
getallManufactureUser(){
  return this.http.get(`${this.uri}/getManufactureUser`);
}

getUser(userid){
	
	 const obj = {
			userId: userid    
    };
  return this.http.post(`${this.uri}/getvalidUser`,obj);
}

getvalidUser(){
  return this.http.get(`${this.uri}/validUser`);
}


  getMedicineList() {
    return this.http.get("http://84.22.96.222:10000/getmedicinelist");
  }
  
  
	getPackageList() {
    return this.http.get("http://84.22.96.222:10000/getpackagelist");
  }
  
  getMedicineUserId(){
    this.userId = localStorage.getItem("userId");
    console.log('server side userid',this.userId)
    const obj = {
			userId: this.userId    
    };
    return this.http.post(`${this.uri}/getMedicineUserId`,obj);
  }
  
  getPkgMedicineUserId(){
    this.userId = localStorage.getItem("userId");
    console.log('server side userid',this.userId)
    const obj = {
			userId: this.userId    
    };
    return this.http.post(`${this.uri}/getPkgMedicineUserId`,obj);
  }
  getPackageUserId(){
    this.userId = localStorage.getItem("userId");
    console.log('server side userid',this.userId)
    const obj = {
			userId: this.userId    
    };
    return this.http.post(`${this.uri}/getPackageUserId`,obj);
  }
  
  getNotification() {
    return this.http.get("http://84.22.96.222:10000/getnotification");
  }
  
  getNotificationUserId()
  {
    this.userId = localStorage.getItem("userId");
	this.publickey = localStorage.getItem("publicKey");
    console.log('server side userid',this.userId)
    const obj = {
			userId: this.userId ,
			publickey: this.publickey
    };
    return this.http.post(`${this.uri}/getNotificationUserId`,obj);
  }
  
  
  openpackage(id,publickey){
    this.userId = localStorage.getItem("userId");
    console.log('server side userid',this.userId)
    const obj = {
			userId: this.userId,
			PackageId:id,
			publickey:publickey
    };
    return this.http.post(`${this.uri}/openPackage`,obj);
  }
  
  getMedicineStatus(id){
	  return this.http.get(`${this.uri}/getMedicineStatus/${id}`);
  }  
  
  getPackageStatus(id){
	  return this.http.get(`${this.uri}/getPackageStatus/${id}`);
  }  
  
 getMedicineStatus2(id){
	  return this.http.get(`${this.uri}/getMedicineStatus2/${id}`);
  }
  
  getMedicineStatus3(id){
	  return this.http.get(`${this.uri}/getMedicineStatus3/${id}`);
  }
  
  getPackageStatus3(id){
	  return this.http.get(`${this.uri}/getPackageStatus3/${id}`);
  }
  
  getPackageStatus2(id){
	  return this.http.get(`${this.uri}/getPackageStatus2/${id}`);
  }

  getMedicineId(id){   
	  return this.http.get(`${this.uri}/getByMedicineId/${id}`);
  }
  
  getPackageId(id){   
	  return this.http.get(`${this.uri}/getByPackageId/${id}`);
  }

  transporterMedicine(id){   
	  return this.http.get(`${this.uri}/getTransporter/${id}`);
  }
  
  transporterPackage(id){   
	  return this.http.get(`${this.uri}/getPackageTransporter/${id}`);
  }


  ////Distributor
  getDistributerList() {
    return this.http.get("http://84.22.96.222:10000/getdistributerlist");
  }
  //Distrubtor End

  //Manufacture start
  getManufactureList() {
    return this.http.get("http://84.22.96.222:10000/getmanufacturelist");
  }

  //ManuFacture End

  //WholeSaler Start
  getWholesalerList() {
    return this.http.get("http://84.22.96.222:10000/getwholesalerlist");
  }
  //WholeSaler End

  //Pharma Start
  getPharmaList() {
    return this.http.get("http://84.22.96.222:10000/getpharmalist");
  }
  //Pharma End
  
     //transporter Start
  getTransporterList() {
    return this.http.get("http://84.22.96.222:10000/gettransporterlist");
  }
  //transporter End
  
  //transporter Start
  getPackagetransporterList() {
    return this.http.get("http://84.22.96.222:10000/getpackagetransporterlist");
  }
  //transporter End

  getprofile(x: string) {
    let params: HttpParams = new HttpParams().set("token", x);
    return this.http.get("http://84.22.96.222:10000/profile", { params });
  }

  /*******************************DELETE API*********************************/

  deleteUser(id){
    return this.http.get(`${this.uri}/deleteUser/${id}`);
  }
  
    deletevalidUser(id){
    return this.http.get(`${this.uri}/deletevalidUser/${id}`);
  }
  // delete medicine start

  deleteMedicine(id) {
    return this.http.get(`${this.uri}/deleteMedicine/${id}`);
  }
  
  // delete medicine start

  deleteNotification(id) {
    return this.http.get(`${this.uri}/deleteNotification/${id}`);
  }
  // delete package start

  deletePackage(id) {
    return this.http.get(`${this.uri}/deletePackage/${id}`);
  }
  
  
  deletePackageTransport(id,publickey) {
    const object={
      'id':id,
      'publickey':publickey
    }
       
    return this.http.post(`${this.uri}/deletePackageTransport`,object);
  }
  // delete medicie

  // delete Manufacture start

  deleteManufacture(id) {
    return this.http.get(`${this.uri}/deleteManufacture/${id}`);
  }
  // delete Manufacture ends

  //Delete WholeSaler
  deletewholesaler(id) {
    return this.http.get(`${this.uri}/deleteWholesaler/${id}`);
  }
  //Delete WholeSaler

  //Delete Pharma Start
  deletePharma(id) {
    return this.http.get(`${this.uri}/deletePharma/${id}`);
  }
  //Delete Pharma End
  //Delete Pharma Start
  deleteDistributer(id) {
    return this.http.get(`${this.uri}/deleteDistrubuter/${id}`);
  }
  //Delete Pharma End

  /*******************************************edit item ************************************** */
   editMedicineStatus(id) {
     //console.log("Edit Medicine");
    return this.http.get(`${this.uri}/editMedicineStatus/${id}`);
  }
  
   editPackageStatus(id) {
     //console.log("Edit Medicine");
    return this.http.get(`${this.uri}/editPackageStatus/${id}`);
  }
  
  editPharma(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  editDistributor(id) {
    return this.http.get(`${this.uri}/editDistributor/${id}`);
  }

  editWholesaler(id) {
    return this.http.get(`${this.uri}/editWholesaler/${id}`);
  }
  editManufacture(id) {
    return this.http.get(`${this.uri}/editManufacture/${id}`);
  }
  /************************************update fileds***********************************************/
//-----------------------update user
updateProfile(firstName,lastName,mobileNo,email,mylocation,id) { 

  const obj = {
    firstName:firstName,
    lastName:lastName,
    mobileNo:mobileNo,
    email:email,
    location:mylocation
   
  };
  return this.http.post(`${this.uri}/updateprofile/${id}`, obj);
	//.subscribe(res => console.log("Done"))
}

//-----------------------update user
updatePassword(eid,newPassword,id) { 
    const object={
      'email':eid,
      'password':newPassword,
	  'actcode':''
    }
       
    return this.http.post(`${this.uri}/resetPassword`,object);

	//.subscribe(res => console.log("Done"))
}
//----------------------update pharma
  updatePharma(batchid,  medicineStatus,medicineQuality,id) {   
    const obj = {
      batchid: batchid,
      medicineStatus: medicineStatus,
      medicineQuality: medicineQuality
      
    };
    this.http
      .post(`${this.uri}/updatepharma/${id}`, obj)
      .subscribe(res => console.log("Done"));
  }

  //----------------------Update Wholesaler
  updateWholesaler(batchid,shipper,reciver, id) {    
    const obj = {
      batchid: batchid,
      shipper: shipper,
      reciver: reciver
      
    };
    this.http
      .post(`${this.uri}/updateWholesaler/${id}`, obj)
      .subscribe(res => console.log("Done"));
  }

  updatManufacture(medicinedescription,medicineStatus,pickdate,packdate,reciver,quality, recivertype,id) {
    
    const obj = {
      medicinedescription: medicinedescription,
      medicineStatus: medicineStatus,
      pickdate: pickdate,
      packdate: packdate,
      reciver: reciver,
      quality: quality,
      recivertype: recivertype
    };
    this.http
      .post(`${this.uri}/updateManufacture/${id}`, obj)
      .subscribe(res => console.log("Done"));
  }

  //Update Distributor
  updateDistributor(batchid,shipper, reciver, id) {
    
    const obj = {
      batchid: batchid,
        shipper: shipper,
      reciver: reciver    
    };
    this.http
      .post(`${this.uri}/updateDistributor/${id}`, obj)
      .subscribe(res => console.log("Done"));
  }
}