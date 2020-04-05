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
  color:string ="text-default";

  user:User;

  constructor(public router:Router,private userSerice:UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl(),
      password:new FormControl(),
    });
  }


  login(): void{
    this.color="text-default";
    this.infoMessage ="Processing....kindly hold on.";
    const u = {...this.user, ...this.loginForm.value};
    this.userSerice.loginUser(u).subscribe({
      next:(data)=>this.displayMessage(data),
      error:(err)=>this.displayError(err)
    })
  }

  displayError(err): void{
    this.color ="text-danger";
    let error = err.error.message ? err.error.message : "Server connection , not established";
    this.infoMessage = error;
  }

  displayMessage(data :any){

    if(data.accessToken){
      localStorage.setItem('h',data.accessToken);
      if (this.userSerice.loggedIn()) {
        // code...
        setTimeout(()=>{
          // this.router.navigate(['/groups']);
          let url = window.location.origin+"/groups";
          window.location.href = url;
        },2000);
      }
    }
    // console.log(data)
  }


}
