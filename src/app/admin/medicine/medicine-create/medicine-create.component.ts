import { Component, VERSION, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Medicine } from './addmedicine';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicine-create',
  templateUrl: './medicine-create.component.html',
  styleUrls: ['./medicine-create.component.css']
})
export class MedicineCreateComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted = false;



  qrdata: string = null;
  barcodevalue: any;
  subscription: Subscription;
  createmedicne;
  base;
  call;
  itemId: any = [];
  itemId1: any = [];
  status: any = [];
  transId: any = [];
  statusValue: any;
  medicineid: any = [];
  medicineserial: any;
  blockchain: any = [];
  blockchain2: any = [];
  mypublickey: any;
  privateKey: any;
  medicineStatus: any;
  userId;
  myrole;
  myrole1;
  firstname;
  lastname;
  apiURL: any = "http://84.22.96.222:8080";
  @ViewChild('completeModal') completeModal: ElementRef;
  SerialNumber: string;
  Medicine: string;
  MedicineCurrentTempurature: string;
  Location: string;
  Weight: string;
  ExpiryDate: string;

  constructor(private httpuser: AuthService, private qrReader: QrCodeReader, private http: HttpClient, private formBuilder: FormBuilder) {
    console.log('AppComponent running');
    this.qrdata = ' ';
  }
  changeValue(newValue: string): void {
    this.qrdata = newValue;
  }


  ngOnInit() {
    this.medicineStatus = "Medicine Created by Wholesaler";
    this.userId = localStorage.getItem("userId");
    console.log("User ID", this.userId);
    this.myrole = localStorage.getItem("role");
    this.myrole1 = localStorage.getItem("email");
    console.log("User Role", this.myrole1);
    console.log("User Role", this.myrole);
    this.firstname = localStorage.getItem("firstName");
    this.lastname = localStorage.getItem("lastName");
    console.log("User name", this.firstname, this.lastname);
    //this.medicineid = '92516006ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b5';
    this.registerForm = this.formBuilder.group({
      SerialNumber: ['', Validators.required],
      Medicine: ['', Validators.required],
      MedicineCurrentTempurature: ['', Validators.required],
      Location: ['', Validators.required],
      Weight: ['', Validators.required],
      

      customern: ['', Validators.required],
      customername: ['', Validators.required],
      shipton: ['', Validators.required],
      countrycode: ['', Validators.required],
      shiptoparty: ['', Validators.required],
      pharmadeliveryno: ['', Validators.required],
      salesorderendcustomer: ['', Validators.required],
      purchaseorderendcustomer: ['', Validators.required],
      shippedquantity: ['', Validators.required],
      unit: ['', Validators.required],
      aproductname: ['', Validators.required],
      dosageform: ['', Validators.required],
      packagetype: ['', Validators.required],
      packagesize: [''],
      globelmaterialno: ['', Validators.required],
      plocalmaterialno:[''],
      batchn: ['', Validators.required],
      dateofmanufecture: ['', Validators.required],
      releasedate: ['', Validators.required],
      expirydate: ['', Validators.required],
      productionqty: ['', Validators.required],
      pproductname: ['', Validators.required],
      pglobelmaterialno: ['', Validators.required],
      apackagingsite: ['', Validators.required],
      manufacturinglicense: ['', Validators.required],
      gmvcertificateno: ['', Validators.required],
      certificateno: ['', Validators.required],
      productn: ['', Validators.required],
      globalmaterialn: ['', Validators.required],
      localmaterialn: ['', Validators.required],
       
      areleasedate: ['', Validators.required],
      abatchn: ['', Validators.required],
      amanufacturingsite: ['', Validators.required],
      amanufacturinglicense: ['', Validators.required],
      ManufacturedDate: ['', Validators.required],
      ExpiryDate: [''],
      localmaterialno: ['', Validators.required],
      // AuthorizeReporters: ['', Validators.required],
      // Selectfield: ['', Validators.required],

    });

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

  // qrdata2 = this.medicineid;

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
      link.download = this.medicineserial;
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

  onSubmit(serialNo: string,medicine : string,location : string,MedicineCurrentTempurature: string,weight: string,customern : string,customername : string,shipton : string,countrycode: string,shiptoparty: string,pharmadeliveryno: string,salesorderendcustomer: string,purchaseorderendcustomer: string,shippedquantity : string,unit : string,aproductname : string,dosageform : string,packagetype : string,packagesize: string,globelmaterialno: string,batchn: string,dateofmanufecture : string,releasedate : string,expirydate: string,productionqty : string,pproductname : string,pglobelmaterialno : string,plocalmaterialno: string,apackagingsite : string,manufacturinglicense : string,gmvcertificateno: string,certificateno : string,productn : string,globalmaterialn : string,localmaterialn : string,areleasedate : string,abatchn : string,amanufacturingsite : string,amanufacturinglicense : string,mdate: string, edate: string,
    localmaterialno: string,barcode: string,
  ) {

    if (serialNo == '' || typeof serialNo == 'undefined') {
      alert('serial is empty!');
      return false;
    }
    else if (medicine == '' || typeof medicine == 'undefined') {
      alert('Customers Product Name is empty!');
      return false;
    }

    else if (location == '' || typeof location == 'undefined') {
      alert('Batch N required is empty!');
      return false;
    }
    else if (weight == '' || typeof weight == 'undefined') {
      alert('Batch Certificate N is empty!');
      return false;
    }
    else if (customern == '' || typeof customern == 'undefined') {
      alert('Customer N is empty!');
      return false;
    }
    else if (customername == '' || typeof customername == 'undefined') {
      alert('Customer Name is empty!');
      return false;
    }
    else if (shipton == '' || typeof shipton == 'undefined') {
      alert('Ship to N is empty!');
      return false;
    }
    else if (countrycode == '' || typeof countrycode == 'undefined') {
      alert('Country Code is empty!');
      return false;
    }
    else if (shiptoparty == '' || typeof shiptoparty == 'undefined') {
      alert('Ship to Party is empty!');
      return false;
    }
    else if (pharmadeliveryno == '' || typeof pharmadeliveryno == 'undefined') {
      alert('Pharma Outbound Delivery No is empty!');
      return false;
    }
    else if (salesorderendcustomer == '' || typeof salesorderendcustomer == 'undefined') {
      alert('Sales Order No vs. End Customer is empty!');
      return false;
    }
    else if (purchaseorderendcustomer == '' || typeof purchaseorderendcustomer == 'undefined') {
      alert('Purchase Order N of End Customer is empty!');
      return false;
    }
    else if (shippedquantity == '' || typeof shippedquantity == 'undefined') {
      alert('Shipped Quantity is empty!');
      return false;
    }
    else if (unit == '' || typeof unit == 'undefined') {
      alert('unit is empty!');
      return false;
    }
    else if (aproductname == '' || typeof aproductname == 'undefined') {
      alert('Product Name is empty!');
      return false;
    }
    else if (dosageform == '' || typeof dosageform == 'undefined') {
      alert('Dosage Form is empty!');
      return false;
    }
    else if (packagetype == '' || typeof packagetype == 'undefined') {
      alert('Package type is empty!');
      return false;
    }
    else if (globelmaterialno == '' || typeof globelmaterialno == 'undefined') {
      alert('Global Material No. is empty!');
      return false;
    }
    else if (batchn == '' || typeof batchn == 'undefined') {
      alert('Batch N is empty!');
      return false;
    }
    else if (dateofmanufecture == '' || typeof dateofmanufecture == 'undefined') {
      alert('Date of Manufacturing is empty!');
      return false;
    }
    else if (releasedate == '' || typeof releasedate == 'undefined') {
      alert('Release Date is empty!');
      return false;
    }
    else if (expirydate == '' || typeof expirydate == 'undefined') {
      alert('Expiry Date is empty!');
      return false;
    }
    else if (productionqty == '' || typeof productionqty == 'undefined') {
      alert('Production Qty is empty!');
      return false;
    }
    else if (pproductname == '' || typeof pproductname == 'undefined') {
      alert('Product Name is empty!');
      return false;
    }
    else if (pglobelmaterialno == '' || typeof pglobelmaterialno == 'undefined') {
      alert('Global Material No is empty!');
      return false;
    }
    else if (apackagingsite == '' || typeof apackagingsite == 'undefined') {
      alert('Packaging Site No is empty!');
      return false;
    }
    else if (manufacturinglicense == '' || typeof manufacturinglicense == 'undefined') {
      alert('Manufacturing License is empty!');
      return false;
    }
    else if (gmvcertificateno == '' || typeof gmvcertificateno == 'undefined') {
      alert('GMV Certificate No is empty!');
      return false;
    }
    else if (certificateno == '' || typeof certificateno == 'undefined') {
      alert('Certificate No is empty!');
      return false;
    }
    else if (productn == '' || typeof productn == 'undefined') {
      alert('Product Name is empty!');
      return false;
    }
    else if (globalmaterialn == '' || typeof globalmaterialn == 'undefined') {
      alert('Global Material N is empty!');
      return false;
    }
    else if (localmaterialn == '' || typeof localmaterialn == 'undefined') {
      alert('Local Material N is empty!');
      return false;
    }
    else if (plocalmaterialno == '' || typeof plocalmaterialno == 'undefined') {
      alert('Local Material No is empty!');
      return false;
    }
    else if (areleasedate == '' || typeof areleasedate == 'undefined') {
      alert(' Release Date is empty!');
      return false;
    }
    else if (abatchn == '' || typeof abatchn == 'undefined') {
      alert('Batch N is empty!');
      return false;
    }
    else if (amanufacturingsite == '' || typeof amanufacturingsite == 'undefined') {
      alert('Manufacturing Site is empty!');
      return false;
    }
    else if (amanufacturinglicense == '' || typeof amanufacturinglicense == 'undefined') {
      alert('Manufacturing License is empty!');
      return false;
    }



    let that = this;
    this.submitted = true;


    console.log("User ID", this.userId);

    /* 	Object.keys(this.registerForm.controls).forEach(field => { // {1}
        const control = this.registerForm.get(field);   
        control.markAsUntouched({ onlySelf: true });
        console.log(control.touched);
        control.markAsTouched({ onlySelf: true });       // {3}
      });
        // stop here if form is invalid
         if (!this.registerForm.valid) {
           alert("wrong");
           return;
         } */
   
    //CREATE MEDICINE CODE
    this.medicineStatus = this.firstname + " " + this.lastname + " " + "[Manufacturer]";
    console.log(this.medicineStatus);
    this.mypublickey = localStorage.getItem("publicKey");
    console.log("MedicineStatus", this.mypublickey);
    this.privateKey = localStorage.getItem("privateKey");
    console.log("Private Key", this.privateKey);


    this.createmedicne = new Medicine(serialNo,medicine,MedicineCurrentTempurature,location,weight,'',this.medicineStatus,this.userId,customern,customername,shipton,countrycode,shiptoparty,pharmadeliveryno,salesorderendcustomer,purchaseorderendcustomer,shippedquantity,unit,aproductname,dosageform,packagetype,packagesize,globelmaterialno,plocalmaterialno,batchn,dateofmanufecture,releasedate,expirydate,productionqty,pproductname,pglobelmaterialno,apackagingsite,manufacturinglicense,gmvcertificateno,certificateno,productn,globalmaterialn,localmaterialn,areleasedate,abatchn,amanufacturingsite,amanufacturinglicense,mdate,edate,localmaterialno,barcode
    );
    console.log('createmedicne object => console of data', JSON.stringify(this.createmedicne));
    //blockcahin
    const Metadata = {

      "action": "createMedicine",
      "payloaddata": {
        "serialNumber": serialNo,
        "description": medicine + " " + weight + " " + mdate + " " + edate,
        "location": {
          "type": 1,
          "body": {
            "address": location
          }
        },
        "uintDescription": {
          "units": 12
        }
      },
      "private": this.privateKey,
      "public": this.mypublickey
    }

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
            this.base = this.httpuser.createmedicine(this.createmedicne);
            this.call = this.base.subscribe((data) => {

              console.log(JSON.stringify(data));
              this.medicineid = data.MedicineId;
              this.medicineserial = data.serial;
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
            this.blockchain2 = val
            if (that.httpuser.IsJsonString(this.blockchain2.body)) {
              this.status = JSON.parse(this.blockchain2.body);
              console.log('json value2', this.status.data[0].status);
              this.statusValue = this.status.data[0].status;
              this.itemId = this.status.data[0].id;
              if (this.statusValue == 'COMMITTED') {
                this.base = this.httpuser.createmedicine(this.createmedicne);
                this.call = this.base.subscribe((data) => {
                  console.log("AT = " + JSON.stringify(data));
                  this.medicineid = data.MedicineId;
                  this.medicineserial = data.serial;
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







