import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-transporterdashboard',
  templateUrl: './transporterdashboard.component.html',
  styleUrls: ['./transporterdashboard.component.css']
})
export class TransporterdashboardComponent implements OnInit {

  tlist:any = [];



  constructor(private httpuser: AuthService) { }

  ngOnInit() {
    this.allTransporter();
  }
  allTransporter() {
    return this.httpuser.getallTransporterUser().subscribe(data => {
      this.tlist = data;
      console.log(this.tlist);
    });
  }

}
