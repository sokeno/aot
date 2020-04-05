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

  obj:any =environment.headers;

  user:User;


  constructor(private http: HttpClient) { 
    this.getUser();
    // console.log(this.user);
    // console.log(environment.appUrl);
  }


 currentSignInUser():Observable<User>{
    return this.http.get<User>(this.url+"users/user/me",{headers:this.obj}).pipe(
        // tap((data)=>{
        //   console.log("user service: ",data
        //   )}),
        catchError(this.handleError)
      );
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.url+"auth/signup", user, {headers})
      .pipe(
        tap(data => console.log('create user: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

 loginUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.url+"auth/login", user, {headers})
      .pipe(
        tap(data => console.log('token : ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // loginUser(user:User)

  private handleError(err){
    let errorMessage:string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }else{
      errorMessage = `Backend returned code ${err.status}: ${err.error.message}`;
    }
    return throwError(errorMessage);
  }

  loggedIn():any{
    return !! localStorage.getItem('h');
  }
}
