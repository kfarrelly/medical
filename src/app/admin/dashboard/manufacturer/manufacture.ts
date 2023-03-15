export class Manufacture {
         medicinedescription: string;
         medicineStatus: string;
         pickdate: string;
         packdate:string;
         reciver: string;
         quality: string;
         recivertype: string;

         constructor(
           medicinedescription: string,
           medicineStatus: string,
           pickdate: string,
           packdate:string,
           reciver: string,
           quality: string,
             recivertype: string
         ) {
             this.medicinedescription = medicinedescription;
             this.medicineStatus = medicineStatus;
             this.pickdate = pickdate;
             this.packdate=packdate;
             this.reciver = reciver;
             this.quality = quality;
             this.recivertype = recivertype;

         }
       }
