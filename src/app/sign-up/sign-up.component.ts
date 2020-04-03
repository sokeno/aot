import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import { IUser } from "../shared/Iuser";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  pageTitle : string = "Sign Up";

  username : string;

  errors :boolean =false;

  email: string;

  password : string;

  nameMessage : string = "";

  emailMessage : string = "";

  passwordMessage : string = "";

  infoMessage:string = "";


  constructor(public router :Router ,private userSerice:UserService) { }

  ngOnInit(): void {
  }

  validateForm():boolean {
    this.errors =false;
    // if (this.password && this.password.trim() == "") {
    //   this.passwordMessage = "Enter valid password";
    //   this.errors =true;
    // }
    // if (this.email.trim() == "") {
    //   this.emailMessage = "Enter valid email.";
    //   this.errors =  true;
    // }

    // if (this.username.trim() == "") {
    //   this.nameMessage = "Enter valid username.";
    //   this.errors = true;
    // }

    // if (this.email.trim() !=="") {
    //   let  validMail = this.userSerice.checkEmail(this.email);
    //   if (! validMail ) {
    //     this.emailMessage = "Enter a valid unique email address";
    //     this.errors = validMail;
    //   }
    //   // code...
    // }

    // if (this.username.trim() !=="") {
    //   let  validUsername = this.userSerice.checkUsername(this.username);
    //   if (! validUsername ) {
    //     this.emailMessage = "Enter a valid unique username";
    //     this.errors = validUsername;
    //   }
    //   // code...
    // }
    

    return  true;
  }

  register() :void {

    if (this.validateForm()) {
      // code...
      let obj:IUser = {
        "id":Date.now(),
        "name":this.username,
        "email":this.email,
        "password":this.password
      }
      this.userSerice.newUser(obj);
      this.infoMessage="Registration successful.";
    }
  }

}
