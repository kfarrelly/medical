import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { register } from './signuplog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  
})
export class SignupComponent implements OnInit {
  bb;
  // ab:Subscription;
  constructor(private auth:AuthService,private formBuilder:FormBuilder,private router:Router ,private http: HttpClient ) { }
  data;
  status:any=[];
  statusValue:any;
  resvalue:any=[];
  itemId:any=[];
  keys:any=[];
  myid:any=[];
  adminres:any=[];
  registerForm: FormGroup;
  submitted = false;
  apiURL:any = "http://84.22.96.222:8080"
 
  
  onSignup(fName,lName,role,mobile,location,email,pass,pkey,userId,transectionId){    
    this.submitted = true;  
    if (this.registerForm.invalid) {
      return;
  } 

    let data=new register(fName,lName,role,mobile,location,email,pass,pkey,userId,transectionId);
       this.auth.signup(data).subscribe((res)=>{
       this.keys=res;
	console.log(this.keys);	   
       if(this.keys.role==1)
	   {
          const Metadata = {
       
        "action": "createAdmin",
        "payloaddata": {
          "name": this.keys.firstName+' '+this.keys.lastName,
          "location": {
            "type": 1,
            "body": {
              "address": this.keys.location
            }
          },
          "email": this.keys.email
        },
        "private": this.keys.privateKey,
        "public": this.keys.publicKey
      }     
  
  const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        
      })
    };
  
    var x = this.http.post(this.apiURL, Metadata,httpOptions).subscribe(
       (val) => {		   
        console.log(val);
	    
		this.resvalue=val;		   
        this.status=JSON.parse(this.resvalue.response.body);        
        
		console.log('json value2', this.status.data[0].status);
        
		this.statusValue=this.status.data[0].status;
        this.itemId=this.status.data[0].id;
		   this.myid=JSON.stringify(this.keys) +"'transectionId':"+ (this.itemId);
		   
     
      this.dyanmicDownloadByHtmlTag({
         fileName: this.keys.firstName+' '+this.keys.lastName,
         text: this.myid		
      });      
      alert(' User Successfully Registered!!');	 
      this.router.navigate(['/login']);
      });         
         
   }
    else{
       
       this.dyanmicDownloadByHtmlTag({
         fileName:  this.keys.firstName+' '+this.keys.lastName,
         text: JSON.stringify(res)
      });       
	alert('Successfully Registered!!');
	this.router.navigate(['/login']);
  
    
     }
       },(err)=>{ 
		   alert("Email already exists!!");
	   });
  }
  
 
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: ['',Validators.required],
        mobile: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    location: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
       
    });
}
      // convenience getter for easy access to form fields
      get f() { return this.registerForm.controls; }

      onSubmit() {
         
          // stop here if form is invalid
     
      }
    
    
    //file download code
    private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  
    
    
  
  
  
    private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
	
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
//filedownload code end
  


}
