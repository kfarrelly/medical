export class Distrubuter {
  batchid: string;
  shipper: string;
  reciver: string;

  constructor(batchid: string, shipper: string, reciver: string) {
    this.batchid = batchid;
    this.shipper = shipper;
    this.reciver = reciver;
  }
}
