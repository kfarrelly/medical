import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  selectedWId: string = '';
  selectedTId: string = '';
  base; 
  call;
  serialvalue: any = " ";
  wlist: any = [];
  tlist: any = [];
  wid1: any = '';
  tid1: any = '';
  list: any = [];
  
  blockchain: any = [];
  blockchain2: any = [];
  status: any = [];
  statusValue: any;
  itemId: any = [];
  mypublickey: any;
  privateKey: any;
  myrole;
  userId;
  user:any=[]; 
  
  
  @ViewChild('completeModal') completeModal: ElementRef;
  apiURL: any = "http://84.22.96.222:8080";
  constructor(private http: AuthService, private http1: HttpClient, private router: Router) { }

  ngOnInit() {
    this.notification();
  
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

  serialId(serialId) {
    this.serialvalue = serialId;
  }

 

  notification() {
    this.myrole= localStorage.getItem("role");
   
    if(this.myrole == 1){      
	
	this.http.getvalidUser().subscribe((data)=>{
      this.user=data;          
    });
      return this.http.getNotification().subscribe((data) => {
        this.list = data;
        console.log("All Notification",this.list);
      });
	  
	  

    }else{
      return this.http.getNotificationUserId().subscribe((data) => {
        console.log(data);
        this.list = data;
        console.log("user Notification",this.list);
      });

    }
    
  }

  deleteNotification(id) {
    if (confirm('Are you sure to delete')) {
      this.http.deleteNotification(id).subscribe(res => {

        this.notification();

      });
    }
  }

}
