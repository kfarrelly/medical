import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-wholesalerdashboard',
  templateUrl: './wholesalerdashboard.component.html',
  styleUrls: ['./wholesalerdashboard.component.css']
})
export class WholesalerdashboardComponent implements OnInit {

  wlist:any = [];

  constructor(private httpuser: AuthService) { }

  ngOnInit() {
    this.allWholesaler();
  }
  allWholesaler() {
    return this.httpuser.getallWholesalerUser().subscribe(data => {
      this.wlist = data;
      console.log(this.wlist);
    });
  }


}
