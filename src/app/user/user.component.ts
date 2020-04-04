import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user/user.service";
import { User } from "../shared/user";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	pageTitle : string = "Users";

	users: User[] ;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  	// this.users = this.userService.users;
  }

}
