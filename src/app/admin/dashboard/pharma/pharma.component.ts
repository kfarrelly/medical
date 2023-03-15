import { Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Pharma } from './pharma';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-pharma",
  templateUrl: "./pharma.component.html",
  styleUrls: ["./pharma.component.css"]
})

export class PharmaComponent implements OnInit {

  
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  submitted1 = false;


  pharma1: any = Pharma;
  list: any = [];
  base;
  call;
  editlist: any = [];
  batchid;
  medicineQuality;
  medicineStatus;
  var1 ="";
  close1:boolean;
  @ViewChild('completeModal')completeModal: ElementRef;
  //  button1:any;
  // popuptask:boolean=true;
  constructor(private httpuser: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pharmaList();
    //this.button1='show';
    this.registerForm = this.formBuilder.group({
      batchid0: ['', Validators.required],
      medicineStatus0: ['', Validators.required],
      medicineQuality0: ['', Validators.required]


    });
    this.registerForm1 = this.formBuilder.group({
      batchid011: ['', Validators.required],
      mediStatus011: ['', Validators.required],
      mediQuality011: ['', Validators.required]


    });


  }

  /* postPrivateKey(a){
      console.log(a);
      this.button1="hide";
      this.popuptask=false;	  
      }
      */

  //post data api
  pharmaList() {
    return this.httpuser.getPharmaList().subscribe(data => {
      this.list = data;
    
    });
  }

  get f1() { return this.registerForm1.controls; }
  pharma(x: string, y: string, z: string) {
    console.log("Pharma called");


    this.submitted1 = true;

    // stop here if form is invalid
    if (this.registerForm1.invalid) {
      return;
    }
    console.log(x, y, z);


    this.pharma1 = new Pharma(x, y, z);
    this.base = this.httpuser.pharma(this.pharma1);
    this.call = this.base.subscribe(
      data => {
        alert("Done");
        this.pharmaList();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Done");
      }
    );
  }

  //delete pharam api
  deletePharma(id) {
    if (confirm('Are you sure to delete ?')) {
      this.httpuser.deletePharma(id).subscribe(res => {

        this.pharmaList();
      });
    }
  }

  //edit get pharma detail api

  editPharma(id) {
    this.httpuser.editPharma(id).subscribe(res => {
      this.editlist = res;
    });
  }
  //update edited api
  updatepharma(batchid, medicineStatus, medicineQuality, id) {

    this.route.params.subscribe(params => {
      this.httpuser.updatePharma(batchid, medicineStatus, medicineQuality, id);
      alert("Data Successfully Udated")
      this.router.navigate(['pharma']);
    });
  }


  //---------------------------------------
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(batchid1, medicineStatus1, medicineQuality1, id1) {
   

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(batchid1, medicineStatus1, medicineQuality1, id1);

    this.route.params.subscribe(params => {
      this.httpuser.updatePharma(batchid1, medicineStatus1, medicineQuality1, id1);
      alert("Data Successfully Udated");
      let el: HTMLElement = this.completeModal.nativeElement;
      el.click(); 
      let x= setTimeout(()=>{  this.pharmaList()}, 100);
      this.router.navigate(['pharma']);     
    });       
  }


}
