export interface User{
    id?:number;
    name:string;
    email:string;
    password?:string;
    imageUrl?:string;
    emailVerified?:boolean;
}