import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { environment } from '../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable ,of,throwError } from 'rxjs';
import { catchError,tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = environment.appUrl;

  user:User;


  constructor(private http: HttpClient) { 
    this.getUser();
  }


 currentSignInUser():Observable<User>{
    return this.http.get<User>(this.url+"users/user/me");
 }

 getUser():void {
   this.currentSignInUser().subscribe({
     next:data=>this.storeUser(data),
     error:err=>console.log(err)
   }) 
 }

 storeUser(data):void{
   this.user=data;
   localStorage.setItem('u',JSON.stringify(data))
 }



 createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url+"auth/signup", user)
      .pipe(
        tap(data => console.log('create user: ' + JSON.stringify(data)))
      );
  }

 loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.url+"auth/login", user)
      .pipe(
        tap(data => console.log('token : ' + JSON.stringify(data)))
      );
  }

  loggedIn():any{
    return !! localStorage.getItem('h');
  }
}
