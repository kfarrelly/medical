import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sendpharmadashboard',
  templateUrl: './sendpharmadashboard.component.html',
  styleUrls: ['./sendpharmadashboard.component.css']
})
export class SendpharmadashboardComponent implements OnInit {

	recievedtrans: any = [];
	dlist:any=[];
	tlist: any = [];
   apiURL: any = "http://84.22.96.222:8080";

  constructor(private httpuser: AuthService, private qrReader: QrCodeReader, private http: HttpClient) { }

  ngOnInit() {
	  
	  this.medicinerecievetransactions();
	  this.allDistributer();
	  this.allTransporter();
  }

   medicinerecievetransactions() {
   
      return this.httpuser.getRecieveMedicineTransection().subscribe((data) => {
        this.recievedtrans = data;
		
		
        console.log("All Medicine trans",this.recievedtrans);
      });

    
  }
  allDistributer() {
  return this.httpuser.getallDistributerUser().subscribe(data => {
    this.dlist = data; 
console.log(this.dlist);	  
  });
}
allTransporter() {
    return this.httpuser.getallTransporterUser().subscribe(data => {
      this.tlist = data;
      console.log(this.tlist);
    });
  }

}
