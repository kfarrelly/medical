import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { register } from 'src/app/user/signup/signuplog';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.css']
})
export class AgentCreateComponent implements OnInit {
  user: any = [];
  itemId: any = [];
  itemId1: any = [];
  status: any = [];
  transId: any = [];
  statusValue: any;
  blockchain: any = [];
  blockchain2: any = [];
  submitted = false;
  mypublickey: any;
  privateKey: any;
  apiURL: any = "http://84.22.96.222:8080";
  @ViewChild('completeModal')completeModal: ElementRef;

  constructor(private http: AuthService, private router: Router, private http1: HttpClient) { }

  ngOnInit() {
    this.allUser();
  }

  createmedicine() {
    alert("Successfully created");
  }


  saveUser(fName, lName, role, mobile, location, email, pass, pkey, userId, transectionId) {
    let that = this;
    if (role == 1) {

      let data = new register(fName, lName, role, mobile, location, email, pass, pkey, userId, transectionId);

      this.http.saveSignup(data).subscribe((res) => {
        alert('Request Accepted...');
        let el: HTMLElement = this.completeModal.nativeElement;
        el.click(); 
      
      });
    } else {

      console.log('if the role is not 1',fName,lName);

      this.mypublickey = localStorage.getItem("publicKey");
      this.privateKey = localStorage.getItem("privateKey");
      this.submitted = true;
      //Register User on Blockchain ==>> if "COMMITED" :: register in db else Mail (ERROR Message)	

      const Metadata = {
        "action": "registerUsers",
        "payloaddata": {
          "name": fName + ' ' + lName,
          "email": email,
          "contactNumber": mobile,
          "role": role,
          "location": {
            "type": 1,
            "body": {
              "address": location
            }
          },
          "publicKey": pkey
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
              console.log('saving data to database',fName,lName);
              let data = new register(fName, lName, role, mobile, location, email, pass, pkey, userId, this.itemId);
              this.http.saveSignup(data).subscribe((res) => {
                alert('Request Accepted');
                let el: HTMLElement = this.completeModal.nativeElement;
                el.click(); 
              });
            }
            else {
              alert('Request Rejected');
            }
          } else {

            that.http1.get("http://84.22.96.222:8008/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
              this.blockchain2 =val
              if (that.http.IsJsonString(this.blockchain2.body)) {
                this.status = JSON.parse(this.blockchain2.body);
                console.log('json value2', this.status.data[0].status);
                this.statusValue = this.status.data[0].status;
                this.itemId = this.status.data[0].id;
                if (this.statusValue == 'COMMITTED') {
                  console.log('else saving data to database',fName,lName);
                  let data = new register(fName, lName, role, mobile, location, email, pass, pkey, userId, this.itemId);
                  this.http.saveSignup(data).subscribe((res) => {
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


  allUser() {
    this.http.getallUser().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

  deleteUser(id) {
    this.http.deleteUser(id).subscribe(res => {
      this.allUser();
    });
  }
}
