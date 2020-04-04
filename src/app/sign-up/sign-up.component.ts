import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import { FormGroup, FormControl } from  "@angular/forms";

import { IUser } from "../shared/Iuser";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  pageTitle : string = "Sign Up";

  userForm: FormGroup;


  constructor(public router :Router ,private userSerice:UserService) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      name:new FormControl(),
      email:new FormControl(),
      password:new FormControl(),
    });


  }


  register() :void {

    console.log(this.userForm.value);

  }

}
