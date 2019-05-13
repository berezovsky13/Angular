import { UserType } from '../enums/user-type.enum';

export class UserLoginDetails {

    private id: number;
    private user: string;
    private password: string;
    private type: UserType;

    constructor(username:string, password:string, userType:UserType) {
        this.user = username;
        this.password = password;
        this.type = userType;
    }
    
    public get username():string {
        return this.user;
    }

    
    public get passWord():string {
        return this.password;
    }

    
    public get userType():UserType {
        return this.type;
    }

    public get getId():number {
        return this.id;
    }

    public set setId(id:number) {
        this.id= id;
    }

    
    public set username(username:string) {
        this.user = username;
    }
    public set passWord(password:string) {
        this.password = password;
    }
    
    public set userType(userType:UserType) {
        this.type = userType;
    }
    

    
    
    
    
}
