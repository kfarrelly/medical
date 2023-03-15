import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { register } from './signuplog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html'
  
})
export class ActivationComponent implements OnInit {
  bb;
  // ab:Subscription;
  constructor(private route: ActivatedRoute,private auth:AuthService,private formBuilder:FormBuilder,private router:Router ,private http: HttpClient ) { }
  data;
  message:any;
  actcode:any;
  apiURL:any = "http://84.22.96.222:10000/activation"
 
  
  
 
  
  ngOnInit() {
    
	this.actcode = this.route.snapshot.params['id'];
	
	
	const Metadata = {
        "activation": {
			"code": this.actcode
        }
      }     
  
  const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        
      })
    };
	
	 var x = this.http.post(this.apiURL, Metadata,httpOptions).subscribe(
       (val) => {		   
        alert("Account verfied successfully");
		this.router.navigate(['/login']);
	    
      },(err) => {		   
        console.log(err);
	    this.message = "Verfication code not match with any account. Kindly check and let us know.";
      }); 
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
