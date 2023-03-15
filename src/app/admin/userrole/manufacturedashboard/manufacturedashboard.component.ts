import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-manufacturedashboard',
  templateUrl: './manufacturedashboard.component.html',
  styleUrls: ['./manufacturedashboard.component.css']
})
export class ManufacturedashboardComponent implements OnInit {

  mlist:any = [];

  constructor(private httpuser: AuthService) { }

  ngOnInit() {
    this.allManufacture();
    
  }
 
  allManufacture() {
    return this.httpuser.getallManufactureUser().subscribe(data => {
      this.mlist = data;
      console.log(this.mlist);
    });
  }


}
