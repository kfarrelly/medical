import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { Distributor } from './distributorqr';

import { FormGroup, FormControl, Validators , ReactiveFormsModule  } from '@angular/forms';


@Component({
  selector: 'app-distributorqr',
  templateUrl: './distributorqr.component.html',
  styleUrls: ['./distributorqr.component.css']
})
export class DistributorqrComponent implements OnInit {
 // Write regular expression to validate email id
 EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
 // Create object of FormGroup
registrationForm: FormGroup;
  barcodevalue:any;
  subscription: Subscription;
  pharma1: any = Distributor;
  base;
  call;



  constructor(private httpuser:AuthService,private qrReader: QrCodeReader) { }

  ngOnInit() {
   // Initilize formgroup throgh formcontrol and apply validations
   this.registrationForm = new FormGroup({
    emailval: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)])
   })
  }
  validateform()
  {
    // As we know that when user does not fill any value and click on submit button in that 
    // condition form will be invalid 
    if(this.registrationForm.invalid){
      // Validation errors are called when user put focus on control but does't fill any value or wrong values
      // So we are making our control touched

      this.registrationForm.get('emailval').markAsTouched();
      
      // return false to prevent form submit
return false;
    }
  }

  onSubmit(formvalue)
  {
    console.log(formvalue);
    console.log(this.registrationForm.value);
  }
 
  sendRequest(mail){
	  
	
	  if(mail == '' || !mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
	  {
		  alert("Kindly add valid email address");
		  return false;
	  }
	  
	  
    console.log(mail);
    // this.pharma1 = new Distributor(mail);
    this.base = this.httpuser.distributorqr(mail);
    this.call = this.base.subscribe(
      data => {
        alert("Mail has been Sent!!");
        
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Mail has been Sent!!");
      }
    );
  }
  // onFileChange(event){
  //   const file = event.target.files[0];
  //   this.subscription = this.qrReader.decode(file)
  //    .subscribe(decodedString =>{
  //    this.barcodevalue= decodedString;
  //   console.log(decodedString)
  //   });
  // }

}
