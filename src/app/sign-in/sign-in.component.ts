import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from  "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  pageTitle: string ="Sign In";

  loginForm: FormGroup;


  constructor(public router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl(),
      password:new FormControl(),
    });
  }


  login(): void{
    console.log(this.loginForm.value);
  }
}
