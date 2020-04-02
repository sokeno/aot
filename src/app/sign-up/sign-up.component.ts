import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  pageTitle : string = "Sign Up";

  username : string = "";

  email: string = "";

  password : string = "";

  nameMessage : string = "";

  emailMessage : string = "";

  passwordMessage : string = "";


  constructor(public router :Router) { }

  ngOnInit(): void {
  }


  register() :void {
    
  }

}
