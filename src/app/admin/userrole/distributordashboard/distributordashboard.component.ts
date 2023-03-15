import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-distributordashboard',
  templateUrl: './distributordashboard.component.html',
  styleUrls: ['./distributordashboard.component.css']
})
export class DistributordashboardComponent implements OnInit {
  dlist:any=[];

  constructor(private httpuser: AuthService) { }

  ngOnInit() {
    this.allDistributer();
  }
  allDistributer() {
    return this.httpuser.getallDistributerUser().subscribe(data => {
      this.dlist = data; 
  console.log(this.dlist);	  
    });
  }

}
