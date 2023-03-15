import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UserLog } from '../mylogin/userlog';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profile:any=[];
token:any;
editlist: any = [];
mypublickey:any;
privateKey:any;
blockchain2: any = [];
status: any = [];
statusValue: any;
blockchain: any;
itemId: any = [];
role:any;
 userlog:UserLog;
base;
  call;
apiURL: any = "http://84.22.96.222:8080";
 @ViewChild('closeModal') closeModal: ElementRef
 @ViewChild('closeProfile') closeProfile: ElementRef
  constructor(private http:AuthService,private route: ActivatedRoute,private router: Router,private http2: HttpClient) { }


  ngOnInit() {
  
    this.token =localStorage.getItem("id_token");      
     this.myprofile(this.token);
  }

  myprofile(token=this.token){

        return this.http.getprofile(token).subscribe((data)=>{
      this.profile=data;       
	  console.log("Profile data:"+ JSON.stringify(data));
    })
  }

  
  //update edited api
   updateuserprofile(fname,lname,mobile,email,location,publickey) { 
   if(fname == '')
	{
		alert("Kindly add First Name!!");
		return false; 
	}
	if(lname == '')
	{
		alert("Kindly add Last Name!!");
		return false; 
	}
	if(mobile == '' || mobile.length < 10 || isNaN(mobile))
	{
		alert("Kindly add Valid Mobile number!!");
		return false; 
	}
	
	if(location == '')
	{
		alert("Kindly add Location Name!!");
		return false; 
	}
	
   
     this.http.updateProfile(fname,lname,mobile,email,location,publickey).subscribe((data)=>{
			alert('Profile data saved ');
			this.closeProfile.nativeElement.click()
     });
   }

    updateuserpassword(email,curpass,pass,confpass,publickey) { 
	if(pass!=confpass)
	{
		alert("Password do not match!!");
		return false; 
	}
	if(pass.length < 6)
	{
		alert("Password length should equals to or greater than six. !!");
		return false;
	}
	
	if(curpass == '')
	{
		alert("Kindly add Current Password!!");
		return false; 
	}
	 this.userlog = new UserLog(email,curpass);    
	
	this.http.userlog(this.userlog).subscribe( (data) => {
		
     return this.http.updatePassword(email,pass,publickey).subscribe((data)=>{
			//this.myprofile(this.token);
		this.closeModal.nativeElement.click(); //<-- here
			alert('Password Changed Successfully');
     });
	},     (err) => {
               console.log(err);
               alert("Current Password does not match.");
             },
                 () => {
                console.log("User Data Checks Out");
          });
   }

// //     let that = this; 
//     this.mypublickey = localStorage.getItem("publicKey");
//     this.privateKey = localStorage.getItem("privateKey");  
//     this.role = localStorage.getItem("role"); 

//      const Metadata = { "action": "updateUserProfile",
//      "payloaddata": {
//          "name": fname+' '+lname,
//          "email": email,
//          "contactNumber":mobile,
//          "role":this.role,
//          "location": {
//              "type": 1,
//              "body": {
//                  "address": location
//              }
//          }
//      },
//      "public": this.mypublickey,
//      "private": this.privateKey
//  }

//       const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json'
//         })
//       }

//       return this.http2.post(this.apiURL, Metadata, httpOptions).subscribe(
//         (val) => {

//           console.log("POST call successful value returned in body", val);
//           this.blockchain = val;
//           if (that.http.IsJsonString(this.blockchain.response.body)) {
//             JSON.parse(this.blockchain.response.body).hasOwnProperty("data");

//             this.status = JSON.parse(this.blockchain.response.body);
//             this.statusValue = this.status.data[0].status;
//             this.itemId = this.status.data[0].id;
//             if (this.statusValue == 'COMMITTED') {
//               console.log(fname);
             
//               // return this.http.updateProfile(fname,lname,mobile,email,location,publickey).subscribe((data)=>{
//               //   alert('data saved ');
//               // });
//             }
//             else {
//               alert("Process not completed");
//             }
//           }
//           else {

//             that.http2.get("http://165.227.119.244:8008/batch_statuses?" + this.blockchain.id + "&wait").subscribe((val) => {
//               this.blockchain2 = val
//               if (that.http.IsJsonString(this.blockchain2.body)) {
//                 this.status = JSON.parse(this.blockchain2.body);
//                 console.log('json value2', this.status.data[0].status);
//                 this.statusValue = this.status.data[0].status;
//                 this.itemId = this.status.data[0].id;
//                 if (this.statusValue == 'COMMITTED') {
//                   return this.http.updateProfile(fname,lname,mobile,email,location,publickey).subscribe((data)=>{
//                     alert('data saved ');
//                   });
//                 }
//                 else {
//                   alert('Request Rejected');
//                 }
//               }
//             })
//           }
//           // }).catch(function (err) {
//           //   console.log(err.message);
//         });
    
//   }

      
      // return this.http.updateProfile(fname,lname,mobile,email,location,publickey).subscribe((data)=>{
      //   alert('data saved ');
      // });
      // updateuserprofile(fname,lname,mobile,email,location,publickey) {
      
      //   this.base = this.http.updateProfile(fname,lname,mobile,email,location,publickey);
      //   this.call = this.base.subscribe(
      //     data => {
      //       alert("done");
    
      //     },
      //     err => {
      //       console.log(err);
      //     },
      //     () => {
      //       console.log("Done");
      //     }
      //   );
      // }







    }
        



