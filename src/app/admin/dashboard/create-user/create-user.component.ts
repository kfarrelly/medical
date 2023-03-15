import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';
import { newUser } from './newuser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newuser:newUser;
  base;
  call:Subscription;

  constructor(private r:Router, private httpser:AuthService) { }

  ngOnInit() {
  }

  createuser( x:string, y:string, z:string)
  {
   this.newuser = new newUser(x,y,z);
    this.base = this.httpser.createuser(this.newuser);
    this.call = this.base.subscribe((data) => {
    alert("User created");
    },
    (err) => {
    console.log(err);
    },
    () => {
      console.log("Done");
    });
    
  }
  

}
