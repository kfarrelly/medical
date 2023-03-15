export class Transection {
    serial: string;	
    wholesalerId:string;
    transporterId:string;   

	constructor(   
         serial: string,
        wholesalerId:string,
        transporterId:string,
       )
        {
            this.serial=serial;
            this.wholesalerId=wholesalerId;
            this.transporterId=transporterId;           
	
    	}
}
