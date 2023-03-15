import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-wholesalerqr',
  templateUrl: './wholesalerqr.component.html',
  styleUrls: ['./wholesalerqr.component.css']
})
export class WholesalerqrComponent implements OnInit {
  barcodevalue:any;
  subscription: Subscription;
  actcode:any;
  base;
  call;


  constructor(private route: ActivatedRoute,private httpuser:AuthService,private qrReader: QrCodeReader) { }

  ngOnInit() {
	  
	  this.actcode = this.route.snapshot.params['id'];
  }

  sendRequest(eid,pass){
    console.log(eid,pass);
	if(this.actcode == '')
	{
		alert("Invalid Reset password URL !!");
		return false;
	}
    this.base = this.httpuser.wholesalerqr(eid,pass,this.actcode);
    this.call = this.base.subscribe(
      data => {
        alert("Password had been Changed!!");  
      },
      err => {
		alert("It is either invalid or already used Reset password URL");
		console.log(err);
      },
      () => {
        console.log("Password had been Changed!!");
      }
    );


  }
 


}
