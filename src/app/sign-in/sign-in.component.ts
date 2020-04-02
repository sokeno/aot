import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  pageTitle: string ="Sign In";

  key:string = "";
  keyMessage: string = "";
  passwordMessage : string ="";

  password:string ="";

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  validateFields(): boolean{
    
    this.keyMessage =  (this.key.trim() == "") ? "Email or phonenumber is required." : "";

    this.passwordMessage = (this.password.trim() == "") ? "Password is required." : "";

    return this.key.trim() !== "" && this.password.trim() !== "" ? true :false;
  }


  loginHuman(): void{

    if(this.validateFields()){
      console.log('Valid')
    }else{
      console.log('Invalid')
    }

    console.log(this.key,this.password);
  }
}
