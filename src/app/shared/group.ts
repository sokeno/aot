export interface Group{
    id?:number;
    name:string;
    description:string;
    created_by?:number;
}


export interface User{
    id?:number;
    name:string;
    email:string;
    password?:string;
    imageUrl?:string;
    emailVerified?:boolean;
}

export interface GroupsWithUser{
	groups:Group[];
	user:User;
}