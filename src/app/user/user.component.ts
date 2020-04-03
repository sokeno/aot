import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user/user.service";
import { IUser } from "../shared/Iuser";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	pageTitle : string = "Users";

	users: IUser[] ;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  	this.users = this.userService.users;
  }

}
