import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserLog } from './userlog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.css']
})
export class MyloginComponent implements OnInit,OnDestroy {
    signinform:any=FormGroup;
    submitted = false;
  constructor( private route:Router, private httplog:AuthService,private formBuilder:FormBuilder) { }
    userlog:UserLog;
    user;
    sub:Subscription;
    tempToken;

  onSubmit(x,y)
  {
     this.submitted = true;
     if (this.signinform.invalid) {
      return;
    }
        else{
         
          
              this.userlog = new UserLog(x,y);              
              this.user = this.httplog.userlog(this.userlog);              
                this.sub = this.user.subscribe( (data) => {
				        let myrole=data.body;				
                this.tempToken = data.headers.get('x-token');
                this.httplog.setTkn(this.tempToken);
                localStorage.setItem("id_token",this.tempToken);
				localStorage.setItem("publicKey",myrole.publicKey);
                localStorage.setItem("role",myrole.role);
                localStorage.setItem("email",myrole.email);
                localStorage.setItem("userId",myrole.userId);
                localStorage.setItem("firstName",myrole.firstName);
                localStorage.setItem("lastName",myrole.lastName);

                console.log("User Data",myrole);
                console.log("User publicKey",myrole.publicKey);
                console.log(myrole.firstName,myrole.lastName);
       
	
               
						
						switch(myrole.role) { 
						
						 case "1": { 
								this.route.navigate(['/medicinedashboard']);
								  break; 
							   } 
							   case "2": { 
                //this.route.navigate(['/manufacture']);
                this.route.navigate(['/medicinedashboard']);
								  break; 
							   } 
							   case "3": { 
								this.route.navigate(['/wholesalerdashboard1']);	 
								  break; 
							   } 
							   case "4": {
								 this.route.navigate(['/distributordashboard1']); 
								  break;    
							   } 
							   case "5": { 
								  this.route.navigate(['/sendpharma']);
								  break; 
							   }  
							    case "7": { 
								  this.route.navigate(['/transporter']);
								  break; 
							   }
							   default: { 
								 alert("User role not define"); 
								  break;              
							   } 
							}
									

						
						
       },
             (err) => {
               console.log(err);
               alert("Email or password does not match or You are not a verified user");
             },
                 () => {
                console.log("User Data Checks Out");
          });
    }
}
 

  
     ngOnInit() {
       this.signinform=this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      });

        }
        get f() { return this.signinform.controls; }

  ngOnDestroy()
  {
    if(this.sub !== undefined)
    {
      this.sub.unsubscribe();
    }
  }

}
