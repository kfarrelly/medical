import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine2 } from 'src/app/admin/medicine/medicine-create/addmedicine2';
import { Transection } from 'src/app/admin/medicine/medicine-list/transection';
@Component({
  selector: 'app-sendwholesalerdashboard',
  templateUrl: './sendwholesalerdashboard.component.html',
  styleUrls: ['./sendwholesalerdashboard.component.css']
})
export class SendwholesalerdashboardComponent implements OnInit {
 
  selectedWId: string = '';
  selectedTId: string = '';
  serialvalue:any;
  barcodevalue:any;
  subscription: Subscription;
transporter1: any = Medicine2;
list: any = [];
trans: any = [];
recievedtrans: any = [];
mlist:any=[];malist:any=[];
dlist:any=[];
tlist:any=[];
TMlist:any=[];
wid1:any='';
tid1:any='';
transection:any=Transection;
base;
call;
displayTable:boolean=false;
blockchain:any=[];
blockchain2:any=[];
status:any=[];
statusValue:any;
itemId:any=[];
medicineStatus;
  mypublickey:any;
  privateKey:any;
  apiURL:any = "http://84.22.96.222:8080";

  constructor(private httpuser: AuthService,private qrReader: QrCodeReader,private http: HttpClient) { }

  ngOnInit() {
    this.medicineStatus="Recived to Wholesaler";
    this.mypublickey =localStorage.getItem("publicKey");
    this.privateKey =localStorage.getItem("privateKey"); 
    this.transporterMedicineId(this.mypublickey);
    this.allDistributer();
    this.allTransporter();
	this.allManufacture();
	this.medicinetransactions();
	this.medicinerecievetransactions();
  }
 
   medicinetransactions() {
   
      return this.httpuser.getMedicineTransection().subscribe((data) => {
        this.trans = data;
		
		
        console.log("All Medicine trans",this.trans);
      });

    
  }
  allManufacture() {
    return this.httpuser.getallManufactureUser().subscribe(data => {
      this.malist = data;
    });
  }

  medicinerecievetransactions() {
   
      return this.httpuser.getRecieveMedicineTransection().subscribe((data) => {
        this.recievedtrans = data;
		
		
        console.log("All Medicine trans",this.trans);
      });

    
  }
  
  selectChangeHandler1 (event: any) {
    //update the ui
    this.selectedWId = event.target.value;
  }

  selectChangeHandler2 (event: any) {
    //update the ui
    this.selectedTId = event.target.value;
  }

  serialId(serialId){
    this.serialvalue=serialId;
	  this.serialvalue=serialId;  
  }
  

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString =>{
    this.barcodevalue= decodedString;
    console.log(decodedString)
    });
  }

  transporterMedicineId(id) {
    return this.httpuser.transporterMedicine(id).subscribe(data => {
      this.TMlist = data; 
console.log('medicne list',data);	  
    });
  }

  getByMedicineId(id) {  
    
    let that = this;
    this.mypublickey =localStorage.getItem("publicKey");
    this.privateKey =localStorage.getItem("privateKey");  
    this.httpuser.getMedicineId(id).subscribe(data => {
   this.mlist=data;

   //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	
			  
 const Metadata = {
  "action": "recieveFromManufecturer",
  "payloaddata": {
      "serialNumber": this.mlist[0].serial,
      "status": 4,
      "comment": "Delivered"
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

    this.status = JSON.parse(this.blockchain.response.body);            
    this.statusValue = this.status.data[0].status;
    this.itemId = this.status.data[0].id;
    if (this.statusValue == 'COMMITTED') {   
   this.displayTable=true; 
   this.transporter(this.mlist[0].serial,this.mlist[0].medicine,this.mlist[0].barcode,this.mlist[0].location,this.mlist[0].weight,this.mlist[0].Edate,this.mlist[0].Mdate,
    this.mlist[0].MedicineId,this.mlist[0].role,this.mlist[0].time,this.mypublickey,this.medicineStatus);
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
        this.status = JSON.parse(this.blockchain2.body);
        console.log('json value2', this.status.data[0].status);
        this.statusValue = this.status.data[0].status;
        this.itemId = this.status.data[0].id;
        if (this.statusValue == 'COMMITTED') {
          this.transporter(this.mlist[0].serial,this.mlist[0].medicine,this.mlist[0].barcode,this.mlist[0].location,this.mlist[0].weight,this.mlist[0].Edate,this.mlist[0].Mdate,
            this.mlist[0].MedicineId,this.mlist[0].role,this.mlist[0].time,this.mypublickey,this.medicineStatus);
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

allDistributer() {
  return this.httpuser.getallDistributerUser().subscribe(data => {
    this.dlist = data; 
console.log(this.dlist);	  
  });
}

allTransporter() {
  return this.httpuser.getallTransporterUser().subscribe(data => {
    this.tlist = data; 
console.log(this.tlist);	  
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


mTransection(serial:string,distributerId:string,transpoterId:string) {  
  let that = this; 
  //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	
			  
 const Metadata = {
			  "action": "sendToDistributer",
    "payloaddata": {
        "serialNumber": serial,
        "distributer": {
            "address": distributerId,
            "comment": "In Transaction"
        },
        "transporterid": transpoterId
    },
				"private":this.privateKey,
				"public": this.mypublickey
					}	    
	
	const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
	
            var x = this.http.post(this.apiURL, Metadata,httpOptions).subscribe(
       (val) => {	
	  
console.log("POST call successful value returned in body", val);
this.blockchain = val;
if (that.httpuser.IsJsonString(this.blockchain.response.body)) {
  JSON.parse(this.blockchain.response.body).hasOwnProperty("data");

  this.status = JSON.parse(this.blockchain.response.body);            
  this.statusValue = this.status.data[0].status;
  this.itemId = this.status.data[0].id;
  if (this.statusValue == 'COMMITTED') {
    this.transection = new Transection(serial,distributerId,transpoterId);
    this.base = this.httpuser.medicineTransection(this.transection);
    this.call = this.base.subscribe(data => {        
        alert('Request Accepted');       
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
          this.transection = new Transection(serial,distributerId,transpoterId);
          this.base = this.httpuser.medicineTransection(this.transection);
          this.call = this.base.subscribe(data => {              
             alert('Request Accepted');          
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
