import { Component, VERSION, OnInit,ElementRef,ViewChild,OnDestroy } from '@angular/core';
import { Package } from './addpackage';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.css']
})
export class PackageCreateComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted = false;



  qrdata: string = null;
  barcodevalue: any;
  subscription: Subscription;
  createpackage;
  base;
  call;
  itemId: any = [];
  itemId1: any = [];
  status: any = [];
  transId: any = [];
  statusValue: any;
  level:any = '';
  location:any = '';
  serialnum:any = '';
  medicines:any = '';
  packages:any = [];
  packageid: any = [];
  packageserial: any;
  blockchain: any = [];
  blockchain2: any = [];
  mypublickey: any;
  privateKey: any;
  medicineStatus:any;
  list: any = [];
  allpackage: any = [];
  userId;
  myrole;
  myrole1;
  firstname;
  lastname;
  apiURL: any = "http://84.22.96.222:8080";
  @ViewChild('completeModal')completeModal: ElementRef;

  constructor(private httpuser: AuthService, private qrReader: QrCodeReader, private http: HttpClient, private formBuilder: FormBuilder) {
    console.log('AppComponent running');
    this.qrdata = ' ';
  }
  changeValue(newValue: string): void {
    this.qrdata = newValue;
  }


  ngOnInit() {
    this.medicineStatus="Package Created by Manufacturer";
    this.userId = localStorage.getItem("userId");
    console.log("User ID", this.userId);
    this.myrole = localStorage.getItem("role");
    this.myrole1 = localStorage.getItem("email");
	
    console.log("User Role", this.myrole1);
    console.log("User Role", this.myrole);
	 this.mypublickey = localStorage.getItem("publicKey");

    this.privateKey = localStorage.getItem("privateKey");
    this.firstname=localStorage.getItem("firstName");
    this.lastname=localStorage.getItem("lastName");
    console.log("User name", this.firstname,this.lastname);
    //this.medicineid = '92516006ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b5';
    this.registerForm = this.formBuilder.group({
      SerialNumber: ['', Validators.required],
      Level: ['', Validators.required],
	  Location: ['', Validators.required],
	  Medicines:[''],
	  Packages:['']
     // AuthorizeReporters: ['', Validators.required],
     // Selectfield: ['', Validators.required],

    });
	this.medicinelist();
    this.packagelist();

  }
  
  medicinelist() {
    this.myrole= localStorage.getItem("role");
   
    if(this.myrole == 1){      
      return this.httpuser.getMedicineList().subscribe((data) => {
        this.list = data;
        console.log("All Medicine",this.list);
      });

    }else{
      return this.httpuser.getPkgMedicineUserId().subscribe((data) => {
        console.log(data);
        this.list = data;
        console.log("user Medicine",this.list);
      });

    }
	for(var i=0;i<=this.list.length;i++)
	{
		this.list[i].id = this.list[i]._id.toString();
	}
	
    
  }
  
    packagelist() {
    this.myrole= localStorage.getItem("role");
   
    if(this.myrole == 1){      
      return this.httpuser.getPackageList().subscribe((data) => {
        this.allpackage = data;
        console.log("All Medicine",this.list);
      });

    }else{
      return this.httpuser.getPackageUserId().subscribe((data) => {
        console.log(data);
        this.allpackage = data;
        console.log("user Medicine",this.list);
      });

    }
    
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {
        this.barcodevalue = decodedString;
        console.log(decodedString)
      });
  }
   
  

  //saving image file of Qr code 

 // qrdata2 = this.packageid;

  saveAsImage(parent) {
    // fetches base 64 date from image
    const parentElement = parent.el.nativeElement.querySelector("img").src;

    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.packageserial;
      link.click();
    }

  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }



  ngOnDestroy(): void {

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
	 // alert(this.medicines); return true;
	 
	if(this.medicines.length<=0 && this.level <=0)
	{
		alert("Kindly select medicines for bundle");
		return false;
	}
	else if(this.packages.length<=0 && this.level >0)
	{
		alert("Kindly select packages for bundle");
		return false;
	}
	
	
	 
    let that = this;
    this.submitted = true;
    

    console.log("User ID", this.userId);
	

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.serialnum, this.level, this.medicines, this.packages, this.location,this.userId);
    //CREATE MEDICINE CODE
    this.medicineStatus=this.firstname + " " +this.lastname + " " + "[Manufacturer]";
    console.log(this.medicineStatus);
    this.mypublickey = localStorage.getItem("publicKey");
    console.log("MedicineStatus", this.mypublickey);
    this.privateKey = localStorage.getItem("privateKey");
    console.log("Private Key", this.privateKey );
    
   
    this.createpackage = new Package(this.serialnum, this.level, this.medicines, this.packages, this.location,this.userId);
    console.log('console of data',this.createpackage);
    //blockcahin
	if(this.level > 0)
		var inbounds = this.medicines;
	else
		var inbounds = this.packages;
	
    const Metadata = {

      "action": "createPackages", 
      "payloaddata": {
        "serialNumber": this.serialnum,
        "description": this.serialnum+ this.level,
        "location": {
          "type": 1,
          "body": {
            "address": this.location
          }
        },
        "level": this.level,
		"inbounds":inbounds
      },
      "private": this.privateKey,
      "public": this.mypublickey
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var x = this.http.post(this.apiURL, Metadata, httpOptions).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
        this.blockchain = val;
        if (that.httpuser.IsJsonString(this.blockchain.response.body)) {
          JSON.parse(this.blockchain.response.body).hasOwnProperty("data");

          this.status = JSON.parse(this.blockchain.response.body);            
          this.statusValue = this.status.data[0].status;
          this.itemId = this.status.data[0].id;
          if (this.statusValue == 'COMMITTED') {
        this.base = this.httpuser.createpackage(this.createpackage);
        this.call = this.base.subscribe((data) => {     
		
			console.log(JSON.stringify(data));
          this.packageid = data.PackageId;
          this.packageserial = data.serial;
          alert('Request Accepted');
          let el: HTMLElement = this.completeModal.nativeElement;
          el.click(); 
          //this.registerForm.reset();
        });
      }
      else {
        alert('Request Rejected');
      }
    } else {

      that.http.get("http://84.22.96.222:8008/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
        this.blockchain2 =val
        if (that.httpuser.IsJsonString(this.blockchain2.body)) {
          this.status = JSON.parse(this.blockchain2.body);
          console.log('json value2', this.status.data[0].status);
          this.statusValue = this.status.data[0].status;
          this.itemId = this.status.data[0].id;
          if (this.statusValue == 'COMMITTED') {
            this.base = this.httpuser.createpackage(this.createpackage);
            this.call = this.base.subscribe((data) => {
				console.log("AT = "+ JSON.stringify(data));
              this.packageid = data.PackageId;
              this.packageserial = data.serial; 
               alert('Request Accepted');
               //this.registerForm.reset();
            });
          }
          else {
            alert('Request Rejected');
          }
        }
      })
    }
  // }).catch(function (err) {
  //   console.log(err.message);
  });
}
}






      
