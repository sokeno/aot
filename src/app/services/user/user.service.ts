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

  constructor(private http: HttpClient) { 
    console.log(environment.appUrl);
  }

 createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.url+"auth/signup", user, {headers})
      .pipe(
        tap(data => console.log('create user: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err){
    let errorMessage:string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }else{
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
