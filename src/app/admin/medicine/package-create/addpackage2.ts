export class Package2 {
    serial: string;	
    medicines:string;
    barcode:string;
    location: string;
    level:string;
    packages:string;
    PackageId:string;
	role: string;
    time:string;
    publickey:string;
    status:string;
   



	constructor(   
			serial: string,
			medicines:string,
			barcode:string,
			location: string,
			level:string,
			packages:string,
			PackageId:string,
			role: string,
			time:string,
			publickey:string,
			status:string,
	)
        {
            this.serial=serial;
            this.medicines=medicines;
            this.barcode=barcode;
            this.location=location;
            this.level=level;
            this.packages=packages;
            this.PackageId=PackageId;
            this.role=role;
            this.time=time;
            this.publickey=publickey;
            this.status=status;
	    
    	}
}
