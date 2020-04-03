import { Injectable } from '@angular/core';
import { IUser } from '../../shared/Iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users :IUser[] =
  [
  	{
  		"id":2,
  		"name":"karis",
  		"email":"karis@mailinator.com",
  		"password":"joy"
  	},
  	{
  		"id":3,
  		"name":"kish",
  		"email":"kish@mailinator.com",
  		"password":"kishkaris"
  	},
  	{
  		"id":4,
  		"name":"mount",
  		"email":"mount@mailinator.com",
  		"password":"mount"
  	},
  	{
  		"id":5,
  		"name":"joy",
  		"email":"joy@mailinator.com",
  		"password":"joy"
  	},
  	{
  		"id":6,
  		"name":"purity",
  		"email":"purity@mailinator.com",
  		"password":"joy"
  	},
  	{
  		"id":7,
  		"name":"kimani",
  		"email":"kimani@mailinator.com",
  		"password":"joy"
  	}

  ];
  constructor() { }

  checkEmail(email :string): boolean{
  	return this.users.some(user=>user.email == email);
  }

  checkUsername(username:string ): boolean{
  	return this.users.some(user=>user.name == username);
  }
  newUser(user:IUser): void{
  	this.users.unshift(user);
  }
}
