import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  user:any=[]; 
 
  constructor(private http:AuthService) { }

  ngOnInit() {
    
    this.validUser();
  
  }

  
  validUser(){
    this.http.getvalidUser().subscribe((data)=>{
      this.user=data;          
    });
  }



  // YOu can delete admin by removin comment in below... deletevalidUser() function...
  
   deletevalidUser(id,role)
  {
    console.log('userId',role);
    if(role == 1){
     if( confirm('This is Admin User, Do you Really want to Delete it?')){
       alert('You can not Delete Admin User');
      // this.http.deletevalidUser(id).subscribe(res => {
      //  alert('Deleted');
      //  this.validUser();
      //  });
    }
    }else{   
      if( confirm('Do you Really want to Delete it?')){
        this.http.deletevalidUser(id).subscribe(res => {
          alert('Deleted');
          this.validUser();
        });
      }     
  }
 }


}
