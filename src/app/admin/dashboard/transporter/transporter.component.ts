import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Transporter} from './transporter';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine2 } from '../../medicine/medicine-create/addmedicine2';
@Component({
  selector: 'app-transporter',
  templateUrl: './transporter.component.html',
  styleUrls: ['./transporter.component.css']
})
export class TransporterComponent implements OnInit {
  barcodevalue:any;
  subscription: Subscription;
transporter1: any = Medicine2;
list: any = [];
mlist:any=[];
// dlist:any=[];
// plist:any=[];
TMlist:any=[];
Medistatus;
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
    this.Medistatus="Recived by Transporter";
    this.mypublickey =localStorage.getItem("publicKey");
    this.transporterMedicineId(this.mypublickey);
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
   transporterList() {
    return this.httpuser.getTransporterList().subscribe(data => {
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


  
  transporterMedicineId(id) {
    return this.httpuser.transporterMedicine(id).subscribe(data => {
      this.TMlist = data; 
console.log(this.TMlist);	  
    });
  }

  getByMedicineId(id,status) {  
    let that = this;
    this.mypublickey =localStorage.getItem("publicKey");
    this.privateKey =localStorage.getItem("privateKey");     
    this.httpuser.getMedicineId(id).subscribe(data => {
   this.mlist=data;
      console.log(this.mlist);
   //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	
			  
 const Metadata = {
  "action": "pickPackage",
  "payloaddata": {
      "serialNumber": this.mlist[0].serial,
      "comment": status
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
   this.transporter(this.mlist[0].serial,this.mlist[0].medicine,this.mlist[0].barcode,this.mlist[0].location,this.mlist[0].weight,this.mlist[0].Edate,this.mlist[0].Mdate,
    this.mlist[0].MedicineId,this.mlist[0].role,this.mlist[0].time,this.mypublickey,this.Medistatus);
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
          this.transporter(this.mlist[0].serial,this.mlist[0].medicine,this.mlist[0].barcode,this.mlist[0].location,this.mlist[0].weight,this.mlist[0].Edate,this.mlist[0].Mdate,
            this.mlist[0].MedicineId,this.mlist[0].role,this.mlist[0].time,this.mypublickey,this.Medistatus);
            alert("Package piked ");
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
    

 



  transporter(a,b,c,d,e,f,g,h,i,j,k,l){  	  
  	this.transporter1 = new Medicine2(a,b,c,d,e,f,g,h,i,j,k,l);
  	 this.base = this.httpuser.transporter(this.transporter1);
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
