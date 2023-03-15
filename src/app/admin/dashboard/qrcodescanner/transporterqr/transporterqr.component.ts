import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transporterqr',
  templateUrl: './transporterqr.component.html',
  styleUrls: ['./transporterqr.component.css']
})
export class TransporterqrComponent implements OnInit {
  barcodevalue:any;
  subscription: Subscription;

  constructor(private httpuser:AuthService,private qrReader: QrCodeReader) { }

  ngOnInit() {
  }
  onFileChange(event){
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
     .subscribe(decodedString =>{
     this.barcodevalue= decodedString;
    console.log(decodedString)
    });
 }

}
