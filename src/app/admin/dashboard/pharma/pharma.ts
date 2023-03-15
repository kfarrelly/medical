export class Pharma {
  batchid: string;
  medicineStatus: string;
  medicineQuality: string;

  constructor(
    batchid: string,
    medicineStatus: string,
    medicineQuality: string
  ) {
    this.batchid = batchid;
      this.medicineStatus = medicineStatus;
      this.medicineQuality = medicineQuality;
  }
}
