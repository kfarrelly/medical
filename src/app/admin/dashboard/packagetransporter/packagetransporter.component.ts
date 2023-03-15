import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Packagetransporter} from './packagetransporter';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Package2 } from '../../medicine/package-create/addpackage2';
@Component({
  selector: 'app-packagetransporter',
  templateUrl: './packagetransporter.component.html',
  styleUrls: ['./packagetransporter.component.css']
})
export class PackagetransporterComponent implements OnInit {
  barcodevalue:any;
  subscription: Subscription;
transporter1: any = Package2;
list: any = [];
mlist:any=[];
// dlist:any=[];
// plist:any=[];
TMlist:any=[];
packageStatus;
base;
call;
status;
displayTable:boolean=false;
blockchain:any=[];
blockchain2:any=[];
status2:any=[];
statusValue:any;
itemId:any=[];
  mypublickey:any;
  privateKey:any;
  apiURL:any = "http://84.22.96.222:8080";

  constructor(private httpuser: AuthService,private qrReader: QrCodeReader,private http: HttpClient) { }

  ngOnInit() {
    this.packageStatus="Recived by Transporter";
    this.mypublickey =localStorage.getItem("publicKey");
    this.transporterPackageId(this.mypublickey);
  }

    onFileChange(event) {
      const file = event.target.files[0];
      this.subscription = this.qrReader.decode(file)
        .subscribe(decodedString =>{
      this.barcodevalue= decodedString;
      console.log(decodedString)
      });
    }

   //post data api
   packagetransporterList() {
    return this.httpuser.getPackagetransporterList().subscribe(data => {
      this.list = data;        
    });
  }


//   allDistributer() {
//     return this.http.getallWholesalerUser().subscribe(data => {
//       this.dlist = data; 
// console.log(this.dlist);	  
//     });
//   }
//   allPharma() {
//     return this.http.getallWholesalerUser().subscribe(data => {
//       this.plist = data; 
// console.log(this.plist);	  
//     });
//   }


  
  transporterPackageId(id) {
    return this.httpuser.transporterPackage(id).subscribe(data => {
      this.TMlist = data; 
console.log(this.TMlist);	  
    });
  }

  getByPackageId(id,status,statusid) {  
    let that = this;
    this.mypublickey =localStorage.getItem("publicKey");
    this.privateKey =localStorage.getItem("privateKey");     
    this.httpuser.getPackageId(id).subscribe(data => {
   this.mlist=data;
      console.log(this.mlist);
   //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	
			  
 const Metadata = {
  "action": "pickPackage",
  "payloaddata": {
      "serialNumber": this.mlist[0].serial,
      "comment": status,
	  "level":this.mlist[0].level
  },
  "private":this.privateKey,
  "public": this.mypublickey
    }	    

const httpOptions = {
headers: new HttpHeaders({
  'Content-Type': 'application/json'
})
}

    return this.http.post(this.apiURL, Metadata,httpOptions).subscribe(
 (val) => {	
  console.log("POST call successful value returned in body", val);
  this.blockchain = val;
  if (that.httpuser.IsJsonString(this.blockchain.response.body)) {
    JSON.parse(this.blockchain.response.body).hasOwnProperty("data");

    this.status2 = JSON.parse(this.blockchain.response.body);            
    this.statusValue = this.status2.data[0].status;
    this.itemId = this.status2.data[0].id;
    if (this.statusValue == 'COMMITTED') {

   this.displayTable=true; 
  if(statusid == 5) this.packageStatus = "Rejected from Distributer";
		this.transporter(this.mlist[0].serial,this.mlist[0].medicines, this.mlist[0].barcode, this.mlist[0].location, this.mlist[0].level, this.mlist[0].packages, this.mlist[0].PackageId, this.mlist[0].role, this.mlist[0].time, this.mypublickey,this.packageStatus);
		if(statusid == 5)
			alert("Package Returned ");
		else
			alert("Package piked ");
  }
  else{
	  alert("Process not completed");
  }
}
  else {

    that.http.get("http://84.22.96.222:8008/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
      this.blockchain2 =val
      if (that.httpuser.IsJsonString(this.blockchain2.body)) {
        this.status2 = JSON.parse(this.blockchain2.body);
        console.log('json value2', this.status2.data[0].status);
        this.statusValue = this.status2.data[0].status;
        this.itemId = this.status2.data[0].id;
        if (this.statusValue == 'COMMITTED') {
          if(statusid == 5) this.packageStatus = "Rejected to Distributer";
                  this.transporter(this.mlist[0].serial,this.mlist[0].medicines, this.mlist[0].barcode, this.mlist[0].location, this.mlist[0].level, this.mlist[0].packages, this.mlist[0].PackageId, this.mlist[0].role, this.mlist[0].time, this.mypublickey,this.packageStatus);
                  if(statusid == 5)
					alert("Package Returned ");
				else
					alert("Package picked");
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
});
}
    

 



transporter(a, b, c, d, e, f, g, h, i, j, k) {
    this.transporter1 = new Package2(a, b, c, d, e, f, g, h, i, j, k);
    this.base = this.httpuser.packagetransporter(this.transporter1);
    this.call = this.base.subscribe(
      data => {
        alert("done");

      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Done");
      }
    );
  }

}
