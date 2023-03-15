import { Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Distrubuter } from './dist';
import { AuthService } from '../../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: "app-distrubuter",
  templateUrl: "./distrubuter.component.html",
  styleUrls: ["./distrubuter.component.css"]
})
export class DistrubuterComponent implements OnInit {

@ViewChild('completeModal')completeModal: ElementRef;
  registerForm: FormGroup;
  registerForm1:FormGroup;
  submitted = false;
  submitted1 = false;


  list: any = [];
  distributor1: any = Distrubuter;
  editlist: any = [];

  base;
  call;
  batchid;
  shipper;
  reciver;
  
  //button1:any;
  //popuptask:boolean=true;

  log(x){
  console.log(x);
  }

  constructor(
    private httpuser: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
	
  ) {}

  ngOnInit() {
    this.distributerList();
  //this.button1='show';
    
  this.registerForm = this.formBuilder.group({
    batchid0: ['', Validators.required],
    medicineStatus0: ['', Validators.required],
    medicineQuality0:['', Validators.required]
    
    
    });
    this.registerForm1=this.formBuilder.group({
      bId011:['',Validators.required],
      shipper011:['',Validators.required],
      reciver011:['',Validators.required]

    });
    
  }
  
 // postPrivateKey(a){
	//  console.log(a);
	 // this.button1="hide";
	 // this.popuptask=false;	  
	//	}
 
  
  distributerList() {
    return this.httpuser.getDistributerList().subscribe(data => {
      this.list = data;
     
    });
  }
  // convenience getter for easy access to form fields
  get f1() { return this.registerForm1.controls; }

  distributer(x: string, y: string, z: string) {
    
         this.submitted1 = true;

      // stop here if form is invalid
        if (this.registerForm1.invalid) {
           return;
         }
       console.log(x,y,z);
    

    this.distributor1 = new Distrubuter(x, y, z);
    this.base = this.httpuser.distributer(this.distributor1);
    this.call = this.base.subscribe(
      data => {
       
        alert("done");
        this.distributerList();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Done");
      }
    );
  }
  deletedistributer(id){
    if(confirm('Are sure to delete ?')){
    this.httpuser.deleteDistributer(id).subscribe(res => {
      
      this.distributerList();
    });
  }
  
  }

  editDistributor(id) {
    this.httpuser.editDistributor(id).subscribe(res => {
      this.editlist = res;
    });
  }
  
  
 
  
   //UpdateDistributor
  updateDistributor(batchid, shipper, reciver, id) {
    this.route.params.subscribe(params => {
      this.httpuser.updateDistributor(batchid, shipper, reciver, id);	 
        
	   alert("Data Updated");
	   
    });
  }


  // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }




 onSubmit(batchid1, shipper1, reciver1, id1){
   
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  console.log(batchid1, shipper1, reciver1, id1);

  this.route.params.subscribe(params => {
    this.httpuser.updateDistributor(batchid1, shipper1, reciver1, id1);	
    let el: HTMLElement = this.completeModal.nativeElement;
      el.click(); 
     let x= setTimeout(()=>{  this.distributerList()}, 100); 
      
   alert("Data Updated");
   
  });
  
 
}


}
