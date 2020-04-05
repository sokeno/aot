import { Component } from '@angular/core';

import { UserService } from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aot-technologies';
  
  constructor(private userService:UserService){
  	// console.log('user',this.userService.user);
  }

 }