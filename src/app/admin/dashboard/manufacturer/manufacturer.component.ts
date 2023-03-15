import { Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Manufacture } from './manufacture';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-manufacturer",
  templateUrl: "./manufacturer.component.html",
  styleUrls: ["./manufacturer.component.css"]
})
export class ManufacturerComponent implements OnInit {




  registerForm: FormGroup;
  submitted = false;
  registerForm1: FormGroup;
  submitted1 = false;

  public qrdata: string = null;
  manufacture1: any = Manufacture;
  list: any = [];
  base;
  call;
  editlist: any = [];
  medicinedescription;
  medicineStatus;
  pickdate;
  packdate;
  reciver;
  quality;
  recivertype;
  userId;
  @ViewChild('completeModal')completeModal: ElementRef;
  
  //button1:any;
  //popuptask:boolean=true;
  constructor(private httpuser: AuthService, private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder) {
	   console.log('AppComponent running');
		this.qrdata = ' ';
  }
   changeValue(newValue: string): void {
    this.qrdata = newValue;
  }

  ngOnInit() {
	  
    this.manufactureList();
    this.userId =localStorage.getItem("userId");
    console.log("User Id is", this.userId);
  //this.button1='show';
 
  this.registerForm = this.formBuilder.group({
    md10: ['', Validators.required],
    sh10: ['', Validators.required],
    pid10:['', Validators.required],
    pad10:['', Validators.required],
    re10: ['', Validators.required],
    qu10: ['', Validators.required],
    rt10: ['', Validators.required],
      
    
    
    });
    this.registerForm1 = this.formBuilder.group({
      md011: ['', Validators.required],
      sh011: ['', Validators.required],
      pid011:['', Validators.required],
      pad011:['', Validators.required],
      re011: ['', Validators.required],
      qu011: ['', Validators.required],
      rt011: ['', Validators.required],
        
      
      
      });


  }
  
/* postPrivateKey(a){
	  console.log(a);
	  this.button1="hide";
	  this.popuptask=false;	  
		} */
  
  manufactureList() {
    return this.httpuser.getManufactureList().subscribe(data => {
      this.list = data;      
    });
  }

 // convenience getter for easy access to form fields
 get f1() { return this.registerForm1.controls; }

  manufacture(a: string,b: string,c: string,d: string,e: string,f: string,g: string) { 

    console.log(c);
    console.log(d);
    console.log("User Id is", this.userId);

    this.submitted1 = true;
  
    // stop here if form is invalid
    if (this.registerForm1.invalid) {
        return;
    }
    console.log(a,b,c,d,e,f,g);


    
  
   
   
    this.manufacture1 = new Manufacture(a, b, c, d, e, f, g);
    this.base = this.httpuser.manufacture(this.manufacture1);
    this.call = this.base.subscribe(
      data => {      

        alert("done");
        this.manufactureList();
      });
    
      
  }

  deletemanufacture(id) {
   if(confirm("Are you sure to delete ?")){
        this.httpuser.deleteManufacture(id).subscribe(res => {
          this.manufactureList();
        });
        
      }
    
   
  }

  editManufacture(id) {
    this.httpuser.editManufacture(id).subscribe(res => {
      this.editlist = res;
    });
  }

 // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }


  onSubmit(medicinedescription1,medicineStatus1,pickdate1,packdate1,reciver1,quality1,recivertype1,id1){
   
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(medicinedescription1,medicineStatus1,pickdate1,packdate1,reciver1,quality1,recivertype1,id1);
    this.route.params.subscribe(params => {
      this.httpuser.updatManufacture(
							medicinedescription1,
							medicineStatus1,
							pickdate1,
							packdate1,
							reciver1,
							quality1,
							recivertype1,
							id1
					  );
      alert("Data Successfully Updated");
      let el: HTMLElement = this.completeModal.nativeElement;
      el.click(); 
     let x= setTimeout(()=>{  this.manufactureList()}, 100);
      this.router.navigate(["manufacture"]);
    });
  
    
    
   
  }


}
