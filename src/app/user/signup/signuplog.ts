export class register{
    firstName:string;
    lastName:string;
    role:string;
    mobileNo:number;
	location:string;
    email:string;
    password:string;
	publicKey:string;
	userId:string;
	transectionId:string;
    constructor(firstName:string,lastName:string,role:string,mobileNo:number,location:string,email:string,password:string,publicKey:string,userId:string,transectionId:string){
                this.firstName = firstName;
                this.lastName = lastName;
                this.role=role;
                this.mobileNo = mobileNo;
				this.location= location;
                this.email = email;
                this.password = password;
				this.publicKey = publicKey;
				this.userId= userId;
				this.transectionId=transectionId;

            }
}