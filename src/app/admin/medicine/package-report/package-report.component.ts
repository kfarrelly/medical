import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
// import { Medicine } from '../medicine-create/addmedicine';
import { Transection } from './transection';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
@Component({
  selector: 'app-package-report',
  templateUrl: './package-report.component.html',
  styleUrls: ['./package-report.component.css']
})
export class PackageReportComponent implements OnInit {

  selectedWId: string = '';
  selectedTId: string = '';
  base;
  call;
  serialvalue: any = " ";
  levelvalue: any = "";
  wlist: any = [];
  tlist: any = [];
  wid1: any = '';
  tid1: any = '';
  list: any = [];
  meds: any = [];
  transection: any = Transection;
  
  blockchain: any = [];
  blockchain2: any = [];
  status: any = [];
  statusValue: any;
  itemId: any = [];
  mypublickey: any;
  privateKey: any;
  myrole;
  userId;
  
  
  
  @ViewChild('completeModal') completeModal: ElementRef;
  apiURL: any = "http://84.22.96.222:8080";
  constructor(private http: AuthService, private http1: HttpClient, private router: Router) { }

  ngOnInit() {
    this.packagelist();
    this.allWholesaler();
    this.allTransporter();
    this.mypublickey = localStorage.getItem("publicKey");

    this.privateKey = localStorage.getItem("privateKey");
    this.myrole= localStorage.getItem("role");
    this.userId = localStorage.getItem("userId");
    console.log("User Idhhhhhhh", this.userId);
    
    console.log(this.myrole);
  }

  selectChangeHandler1(event: any) {
    //update the ui
    this.selectedWId = event.target.value;

  }

  selectChangeHandler2(event: any) {
    //update the ui
    this.selectedTId = event.target.value;
  }

  serialId(serialId,level) {
    this.serialvalue = serialId;
	this.levelvalue = level;
  }

 

  packagelist() {
    this.myrole= localStorage.getItem("role");
   
    if(this.myrole == 1){      
      return this.http.getPackageList().subscribe((data) => {
        this.list = data;
        console.log("All Package",this.list);
      });

    }else{
      return this.http.getPackageUserId().subscribe((data) => {
        console.log(data);
        this.list = data;
        console.log("user Package",this.list);
      });

    }
    
  }

  deletePackage(id) {
    if (confirm('Are you sure to delete')) {
      this.http.deletePackage(id).subscribe(res => {

        this.packagelist(); 

      });
    }
  }

  allWholesaler() {
    return this.http.getallWholesalerUser().subscribe(data => {
      this.wlist = data;
      console.log(this.wlist);
    });
  }

  allTransporter() {
    return this.http.getallTransporterUser().subscribe(data => {
      this.tlist = data;
      console.log(this.tlist);
    });
  }

  
  
  exporttocsv()
  {
	  var data = [];
	  var  datarow = {};
	
	if(Array.isArray(this.list))
			this.meds = this.list;
		else
			this.meds = this.list.split(',');
		
	  for(var i=0;i<=this.meds.length;i++)
	  {
		  console.log("meds==" + this.meds[i]);
		  if(typeof this.meds[i] != "undefined")
		  {
			datarow = {
			serial:this.meds[i].serial,
			location: this.meds[i].location,
			level: this.meds[i].level,
			time: this.meds[i].time,
			};
			data.push(datarow);
		  }
	  }

		var options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalseparator: '.',
		showLabels: true,
		showTitle: true,
		headers: ["Serial Number","Location","Level", "Date/Time"]
		};

		new Angular5Csv(data, 'Report1',options);

		return true;
  }



  mTransection(serial: string, wholesalerId: string, transpoterId: string) {
    let that = this;
    console.log(serial, wholesalerId, transpoterId);
    //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	

    const Metadata = {
      "action": "sendToWholesaler",
      "payloaddata": {
        "serialNumber": serial,
        "wholesaler": {
          "address": wholesalerId,
          "comment": "In Transaction"
        },
        "transporterid": transpoterId,
		"level":this.levelvalue
      },
	  
      "private": this.privateKey,
      "public": this.mypublickey
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var x = this.http1.post(this.apiURL, Metadata, httpOptions).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
        this.blockchain = val;
        if (that.http.IsJsonString(this.blockchain.response.body)) {
          JSON.parse(this.blockchain.response.body).hasOwnProperty("data");
          JSON.parse(this.blockchain.response.body).hasOwnProperty("data");
          console.log(JSON.parse);
          this.status = JSON.parse(this.blockchain.response.body);
          this.statusValue = this.status.data[0].status;
          this.itemId = this.status.data[0].id;
          if (this.statusValue == 'COMMITTED') {

            this.transection = new Transection(serial, wholesalerId, transpoterId);
            this.base = this.http.medicineTransection(this.transection);
            this.call = this.base.subscribe(
              data => {
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

          that.http1.get("http://84.22.96.222:8080/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
            this.blockchain2 = val
            if (that.http.IsJsonString(this.blockchain2.body)) {
              this.status = JSON.parse(this.blockchain2.body);
              console.log('json value2', this.status.data[0].status);
              this.statusValue = this.status.data[0].status;
              this.itemId = this.status.data[0].id;
              if (this.statusValue == 'COMMITTED') {
                this.base = this.http.medicineTransection(this.transection);
                this.call = this.base.subscribe(
                  data => {

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
            }
          })
        }
        // }).catch(function (err) {
        //   console.log(err.message);
      });
  }
}
