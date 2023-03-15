import { Component, OnInit,ElementRef,ViewChild  } from '@angular/core';
import { Wholesaler } from './wholesaler';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-wholesaler",
  templateUrl: "./wholesaler.component.html",
  styleUrls: ["./wholesaler.component.css"]
})
export class WholesalerComponent implements OnInit {

  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  submitted1 = false;


  wholeSaler: Wholesaler;
  list: any = [];
  base;
  call;
  editlist: any = [];
  batchid;
  reciver;
  shipper;

  mypublickey;
  newpublickey;
  mypublickey1;
  primerykeyinput: any = [];
  count: number = 0;
  isShown: boolean = false;
  popuptask: boolean = true;
  button1: any;
  @ViewChild('completeModal')completeModal: ElementRef;
  constructor(private httpuser: AuthService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.button1 = 'show';
    this.onloadcheckKey();
    this.wholesalerList();
    // this.button1='show';

    this.registerForm = this.formBuilder.group({
      batchid0: ['', Validators.required],
      medicineStatus0: ['', Validators.required],
      medicineQuality0: ['', Validators.required]


    });

    this.registerForm1 = this.formBuilder.group({
      bId011: ['', Validators.required],
      shipper011: ['', Validators.required],
      reciver011: ['', Validators.required]

    });



  }

  /* postPrivateKey(a){
	  console.log(a);
	  this.button1="hide";
	  this.popuptask=false;
	
  } */

  wholesalerList() {
    return this.httpuser.getWholesalerList().subscribe(data => {
      this.list = data;
    });
  }


  // convenience getter for easy access to form fields
  get f1() { return this.registerForm1.controls; }

  wholesaler(x: string, y: string, z: string) {

    this.submitted1 = true;

    // stop here if form is invalid
    if (this.registerForm1.invalid) {
      return;
    }
    console.log(x, y, z);



    this.wholeSaler = new Wholesaler(x, y, z);
    this.base = this.httpuser.wholesaler(this.wholeSaler);
    this.call = this.base.subscribe(
      data => {
        alert("Done");
        this.wholesalerList();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Done");
      }
    );
  }
  deleteWholesaler(id) {
    if (confirm('Are you sure to delete?')) {
      this.httpuser.deletewholesaler(id).subscribe(res => {
        this.wholesalerList();
      });
    }
  }

  editWholesaler(id) {
    this.httpuser.editWholesaler(id).subscribe(res => {
      this.editlist = res;
    });
  }
  updateWholesaler(batchid, shipper, reciver, id) {

    this.route.params.subscribe(params => {
      this.httpuser.updateWholesaler(batchid, shipper, reciver, id);
      alert("Data Successfully Updated");
      this.router.navigate(["wholesaler"]);
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSubmit(batchid1, shipper1, reciver1, id1) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(batchid1, shipper1, reciver1, id1);

    this.route.params.subscribe(params => {
      this.httpuser.updateWholesaler(batchid1, shipper1, reciver1, id1);
      alert("Data Successfully Updated");
      let el: HTMLElement = this.completeModal.nativeElement;
      el.click(); 
     let x= setTimeout(()=>{  this.wholesalerList()}, 100);
      this.router.navigate(["wholesaler"]);
    });


  }




  //propup for private key........
  onloadcheckKey() {
    this.mypublickey1 = localStorage.getItem("generatedPublickey");
    this.mypublickey = localStorage.getItem("publicKey");
    if (this.mypublickey1 == this.mypublickey) {
      this.button1 = "hide";
      this.popuptask = false;
    }
    else {
      return;
    }
  }

  //private key post method..............
  postPrivateKey(keystring) {
    this.count++;

    if (this.count == 3) {
      this.logout();
    }
    else {
      return this.httpuser.getpublickey(keystring).subscribe(result => {
        this.primerykeyinput = result;
        this.mypublickey = localStorage.getItem("publicKey");

        if (this.primerykeyinput == this.mypublickey) {
          this.newpublickey = localStorage.setItem('generatedPublickey', this.primerykeyinput);
          this.button1 = "hide";
          this.popuptask = false;
        }
        else {
          console.log('count number', this.count);
          this.button1 = 'show';
        }

      });
    }

  }

  //logout
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("generatedPublickey");
    localStorage.removeItem("role");
    localStorage.removeItem("x-token");
    this.router.navigate(['/home']);
  }


}
