import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from  "@angular/forms";
import { UserService } from "../services/user/user.service";
import { User } from "../shared/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  infoMessage: string= "";

  pageTitle: string ="Sign In";

  loginForm: FormGroup;

  user:User;

  constructor(public router:Router,private userSerice:UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl(),
      password:new FormControl(),
    });
  }


  login(): void{
    const u = {...this.user, ...this.loginForm.value};
    this.userSerice.loginUser(u).subscribe({
      next:(data)=>this.displayMessage(data),
      error:err=>console.log(err)
    })
  }
  displayMessage(data :any){
    if(data.accessToken){
      localStorage.setItem('h',data.accessToken);
      setTimeout(()=>{
        this.router.navigate(['/groups']);
      },2000);
    }
    // console.log(data)
  }
}
