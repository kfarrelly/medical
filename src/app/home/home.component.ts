import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpser:AuthService,private router:Router) { }

  takenToken;
  ngOnInit() {
    // this.takenToken = this.httpser.getTkn();
  	// if(!this.takenToken)
  	// {
  	// 	this.router.navigate(['/login']);
  	// }

  }}
