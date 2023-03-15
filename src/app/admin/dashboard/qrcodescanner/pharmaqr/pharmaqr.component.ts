import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { QrCodeReader } from 'src/app/qr-code-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pharmaqr',
  templateUrl: './pharmaqr.component.html',
  styleUrls: ['./pharmaqr.component.css']
})
export class PharmaqrComponent implements OnInit {
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
