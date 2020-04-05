import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(public router:Router, private userService: UserService) { 
    this.loggedIn= this.userService.loggedIn();
  }

  ngOnInit(): void {
  }

  logOut():void{
  	localStorage.removeItem('h');
    localStorage.removeItem('u');
  	// this.router.navigate(['/sign-in']);
    let url = window.location.origin+"/sign-in";
    window.location.href = url;
  }

}
