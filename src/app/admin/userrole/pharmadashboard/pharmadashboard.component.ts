import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-pharmadashboard',
  templateUrl: './pharmadashboard.component.html',
  styleUrls: ['./pharmadashboard.component.css']
})
export class PharmadashboardComponent implements OnInit {
  dlist: any = [];

  constructor(private httpuser: AuthService) { }

  ngOnInit() {
    this.allPharma();
  }

  allPharma() {
    return this.httpuser.getallPharmaUser().subscribe(data => {
      this.dlist = data;
      console.log(this.dlist);
    });
  }


}
