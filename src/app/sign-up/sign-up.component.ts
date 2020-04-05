import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import { FormGroup, FormControl } from  "@angular/forms";

import { User } from "../shared/user";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  pageTitle : string = "Sign Up";

  userForm: FormGroup;

  infoMessage:string = "";

  color:string ="text-default";

  user:User;


  constructor(public router :Router ,private userSerice:UserService) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      name:new FormControl(),
      email:new FormControl(),
      password:new FormControl(),
    });


  }


  register() :void {
    this.color ="text-default";

    const u = {...this.user, ...this.userForm.value};

    this.userSerice.createUser(u).subscribe({
      next:(data)=>this.displayMessage(data),
      error:(err)=>this.displayError(err)
    });
    
  }

  displayMessage(data:any): void{

    if (data.message !==null ) {
      this.infoMessage =data.message;
    }
    if (data.success == true) {
      this.userForm.reset();
      setTimeout(()=>{
        this.infoMessage=="";
        this.router.navigate(['/sign-in']);
      },2000);
    }
  }


  displayError(err): void{
    this.color ="text-danger";
    let error = err.error.message ? err.error.message : "Server connection , not established";
    this.infoMessage = error;
  }


}
