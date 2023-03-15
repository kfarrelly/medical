import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine2 } from 'src/app/admin/medicine/medicine-create/addmedicine2';
import { Transection } from 'src/app/admin/medicine/medicine-list/transection';

@Component({
  selector: 'app-senddistributordashboard',
  templateUrl: './senddistributordashboard.component.html',
  styleUrls: ['./senddistributordashboard.component.css']
})
export class SenddistributordashboardComponent implements OnInit {

 
  selectedWId: string = '';
  selectedTId: string = '';
  serialvalue: any = " ";
  barcodevalue: any;
  subscription: Subscription;
  transporter1: any = Medicine2;
  list: any = [];
  trans: any = []; 
  recievedtrans: any = [];
  mlist: any = [];
  dlist: any = [];
  tlist: any = [];
  wlist: any = [];
  TMlist: any = [];
  transection: any = Transection;
  base;
  call;
  displayTable: boolean = false;
  blockchain: any = [];
  medicineStatus;
  blockchain2: any = [];
  status: any = [];
  statusValue: any;
  itemId: any = [];
  mypublickey: any;
  privateKey: any;
  @ViewChild('completeModal')completeModal: ElementRef;
  apiURL: any = "http://84.22.96.222:8080";

  constructor(private httpuser: AuthService, private qrReader: QrCodeReader, private http: HttpClient) { }

  ngOnInit() {
    this.medicineStatus="Recived to Distributer";
    this.mypublickey = localStorage.getItem("publicKey");
    this.privateKey = localStorage.getItem("privateKey");
    this.transporterMedicineId(this.mypublickey);
    this.allPharma();
    this.allTransporter();
	this.allWholesaler();
	this.medicinetransactions();
	this.medicinerecievetransactions();
  }
  
     medicinetransactions() {
   
      return this.httpuser.getMedicineTransection().subscribe((data) => {
        this.trans = data;
		
		
        console.log("All Medicine trans",this.trans);
      });

    
  }
  
   medicinerecievetransactions() {
   
      return this.httpuser.getRecieveMedicineTransection().subscribe((data) => {
        this.recievedtrans = data;
		
		
        console.log("All Medicine trans",this.trans);
      });

    
  }
  
  allWholesaler() {
    return this.httpuser.getallWholesalerUser().subscribe(data => {
      this.wlist = data;
      console.log(this.wlist);
    });
  }


  selectChangeHandler1(event: any) {
    //update the ui
    this.selectedWId = event.target.value;
  }

  selectChangeHandler2(event: any) {
    //update the ui
    this.selectedTId = event.target.value;
  }

  serialId(serialId) {
    this.serialvalue = serialId;
  }


  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {
        this.barcodevalue = decodedString;
        console.log(decodedString)
      });
  }

  transporterMedicineId(id) {
    return this.httpuser.transporterMedicine(id).subscribe(data => {
      this.TMlist = data;
      console.log(this.TMlist);
    });
  }

  getByMedicineId(id) {
    let that = this;
    this.mypublickey = localStorage.getItem("publicKey");
    this.privateKey = localStorage.getItem("privateKey");
    this.httpuser.getMedicineId(id).subscribe(data => {
      this.mlist = data;

      //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	

      const Metadata = {
        "action": "recieveFromWholesaler",
        "payloaddata": {
          "serialNumber": this.mlist[0].serial,
          "status": 4,
          "comment": "Delivered"
        },
        "private": this.privateKey,
        "public": this.mypublickey
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      return this.http.post(this.apiURL, Metadata, httpOptions).subscribe(
        (val) => {

          console.log("POST call successful value returned in body", val);
          this.blockchain = val;
          if (that.httpuser.IsJsonString(this.blockchain.response.body)) {
            JSON.parse(this.blockchain.response.body).hasOwnProperty("data");

            this.status = JSON.parse(this.blockchain.response.body);
            this.statusValue = this.status.data[0].status;
            this.itemId = this.status.data[0].id;
            if (this.statusValue == 'COMMITTED') {
              this.displayTable = true;
              this.transporter(this.mlist[0].serial, this.mlist[0].medicine, this.mlist[0].barcode, this.mlist[0].location, this.mlist[0].weight, this.mlist[0].Edate, this.mlist[0].Mdate,
                this.mlist[0].MedicineId, this.mlist[0].role, this.mlist[0].time, this.mypublickey,this.medicineStatus);
              alert("Package piked ");
            }
            else {
              alert("Process not completed");
            }
          }
          else {

            that.http.get("http://84.22.96.222:8008/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
              this.blockchain2 = val
              if (that.httpuser.IsJsonString(this.blockchain2.body)) {
                this.status = JSON.parse(this.blockchain2.body);
                console.log('json value2', this.status.data[0].status);
                this.statusValue = this.status.data[0].status;
                this.itemId = this.status.data[0].id;
                if (this.statusValue == 'COMMITTED') {
                  this.transporter(this.mlist[0].serial, this.mlist[0].medicine, this.mlist[0].barcode, this.mlist[0].location, this.mlist[0].weight, this.mlist[0].Edate, this.mlist[0].Mdate,
                    this.mlist[0].MedicineId, this.mlist[0].role, this.mlist[0].time, this.mypublickey,this.medicineStatus);
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

  allPharma() {
    return this.httpuser.getallPharmaUser().subscribe(data => {
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


  transporter(a, b, c, d, e, f, g, h, i, j, k,l) {
    this.transporter1 = new Medicine2(a, b, c, d, e, f, g, h, i, j, k,l);
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


  mTransection(serial: string, wholesalerId: string, transpoterId: string) {
    let that = this;
    console.log("ID",wholesalerId);
    //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	

    const Metadata = {
      "action": "sendToPharma",
      "payloaddata": {
        "serialNumber": serial,
        "pharma": {
          "address": wholesalerId,
          "comment": "In Transaction"
        },
        "transporterid": transpoterId
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
            this.transection = new Transection(serial, wholesalerId, transpoterId);
            this.base = this.httpuser.medicineTransection(this.transection);
            this.call = this.base.subscribe(data => {

              alert('Request Accepted');
              let el: HTMLElement = this.completeModal.nativeElement;
             el.click(); 
              

            });
          }
          else {
            alert('Request Rejected');
            let el: HTMLElement = this.completeModal.nativeElement;
             el.click(); 
              
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
                this.transection = new Transection(serial, wholesalerId, transpoterId);
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
