import { Component, OnInit,ElementRef,ViewChild  } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Package2 } from './../package-create/addpackage2';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {


  registerForm1: FormGroup;
  submitted = false;

  public now: any = new Date();

  base;
  call;
  serialvalue;
  serialNo: any;
  mStatus: any = Package2;
  updateStatus;
  list: any = [];
  owner: any;
  list2: any = [];
  packagedetails: any = [];
  medicinedetails: any = [];
  editlist: any = [];
  blockchain: any = [];
  blockchain2: any = [];
  status: any = [];
  myrole: any = [];
  statusValue: any;
  itemId: any = [];
  mypublickey: any;
  privateKey: any;
  myrole1;
  firstname;
  lastname;
 
  @ViewChild('completeModal')completeModal: ElementRef;
  apiURL: any = "http://84.22.96.222:8080";
  constructor(private route: ActivatedRoute, private router: Router, private http: AuthService, private http1: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.myrole = localStorage.getItem("role");
    this.myrole1 = localStorage.getItem("email");
    console.log("Email", this.myrole1);
    this.firstname=localStorage.getItem("firstName");
    this.lastname=localStorage.getItem("lastName");
    console.log("User name", this.firstname,this.lastname);


    console.log("User Role " +this.myrole);

    switch (this.myrole) {

      case "1": {
        this.updateStatus = "User is Admin";
        break;
      }

      case "2": {
        this.updateStatus = "Status Updated by"+ " " + this.firstname + " " + this.lastname + " " + "[Manufacturer]";
        break;
      }
      case "3": {
        this.updateStatus = "Status Updated by"+ " " + this.firstname + " " + this.lastname + " " + "[Wholesaler]";
        break;
      }
      case "4": {
        this.updateStatus = "Status Updated by"+ " " + this.firstname + " " + this.lastname + " " + "[Distributor]";
        break;
      }
      case "5": {
        this.updateStatus = "Status Updated by"+ " " + this.firstname + " " + this.lastname + " " + "[Pharma]";
        break;
      }
      case "7": {
        this.updateStatus = "Status Updated by"+ " " + this.firstname + " " + this.lastname + " " + "[Transporter]";
        break;
      }
      default: {
       console.log("User role not define");
        break;
      }
    }
    
    this.serialNo = this.route.snapshot.params['id'];
    this.packageStatus(this.serialNo);
    this.packageStatus2(this.serialNo);
  
    this.mypublickey = localStorage.getItem("publicKey");
    this.privateKey = localStorage.getItem("privateKey");
    

    this.registerForm1 = this.formBuilder.group({
      location011: ['', Validators.required],
     
    });
  }


  packageStatus(id) {
    return this.http.getPackageStatus(id).subscribe((data) =>{  
      this.list = data;
      console.log(this.list);
	  for(var i=0;i<this.list.length;i++)
	  {
		  if(Array.isArray(this.list[i].packages))
				var meds = this.list[i].packages;
			else
				var meds = this.list[i].packages.split(',');
			
			if(meds.length>0)
			{
				for(var j=0;j < meds.length; j++)
				{
					this.http.getPackageStatus3(meds[j]).subscribe((pdata) =>{
						
						this.packagedetails.push(pdata);
						
					});
				}
			}
			
			if(Array.isArray(this.list[i].medicines))
				var meds = this.list[i].medicines;
			else
				var meds = this.list[i].medicines.split(',');
			
			if(meds.length>0)
			{
				for(var j=0;j < meds.length; j++)
				{
					this.http.getMedicineStatus3(meds[j]).subscribe((mdata) =>{
						
					
							this.medicinedetails.push(mdata);
						
					});
				}
			}
			
			this.http.getUser(this.list[i].userId).subscribe((udata) =>{
						
							console.log(udata);
					
							this.owner = udata[0].firstName+" "+udata[0].lastName;
						
					});
	  }
    })
  }

  packageStatus2(id) {
     return this.http.getPackageStatus2(id).subscribe((data) => {
      this.list2 = data;     
    })
  }

  editPackage(id) {
    this.http.editPackageStatus(id).subscribe(res => {
      this.editlist = res;
    
      
    });
  }

  get f1() { return this.registerForm1.controls; }

  medicineUpdate(serial: string, me: string, br: string, location: string, level: string, 
    packages: string, pid: string, ro: string, time: string, mypublickey: string, updateStatus: string) {

      console.log("Data",this.myrole);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm1.invalid) {
      return;
    }

    let that = this;

    //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	

    const Metadata = {
      "action": "medicineStatusUpdate",
      "payloaddata": {
        "serialNumber": serial,
       
        

        "physicalState": {
          "timestamp": this.now,
          "location": {
            "type": 1,
            "body": {
              "address": location
            }
          },
          "temprature": 12,
          

        },
        "userRole" :this.myrole,
		"level":level
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

          this.status = JSON.parse(this.blockchain.response.body);
          this.statusValue = this.status.data[0].status;
          this.itemId = this.status.data[0].id;
          if (this.statusValue == 'COMMITTED') {

            this.mStatus = new Package2(serial, me, br, location, level, packages, pid, ro, this.now, this.mypublickey, this.updateStatus);
            this.base = this.http.createpackage2(this.mStatus);
            this.call = this.base.subscribe(data => {
              alert('Status Updated');
              let el: HTMLElement = this.completeModal.nativeElement;
              el.click(); 
              this.packageStatus2(this.serialNo);
            });
          }
          else {
            alert('Request Rejected');
            let el: HTMLElement = this.completeModal.nativeElement;
             el.click(); 
          }
        } else {

          that.http1.get("http://84.22.96.222:8008/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
            this.blockchain2 = val
            if (that.http.IsJsonString(this.blockchain2.body)) {
              this.status = JSON.parse(this.blockchain2.body);              
              this.statusValue = this.status.data[0].status;
              this.itemId = this.status.data[0].id;
              if (this.statusValue == 'COMMITTED') {
                this.mStatus = new Package2(serial, me, br, location, level, packages, pid, ro, this.now, this.mypublickey, this.updateStatus);
                this.base = this.http.createpackage2(this.mStatus);
                this.call = this.base.subscribe(data => {
                  alert('Status Updated');
                  let el: HTMLElement = this.completeModal.nativeElement;
                  el.click(); 
                  this.packageStatus2(this.serialNo);
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
      });
  }
}
