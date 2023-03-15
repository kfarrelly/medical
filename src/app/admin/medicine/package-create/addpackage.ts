export class Package {
    serial: string;	
    medicines:string;
    packages:string;
    location: string;
    level:string;
	 userId:string;

	constructor(   
         serial: string,
		 level:string,
        medicines:[],
        packages:string,
        location: string,
	userId:string
	
       )
        {
            this.serial=serial;
            this.level=level;
            this.medicines = Array.isArray(medicines)?medicines.join(','):medicines;
            this.location=location;
            this.packages=Array.isArray(packages)?packages.join(','):packages;
            this.userId=userId;
	
    	}
}
