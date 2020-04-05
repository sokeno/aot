import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable ,of,throwError } from 'rxjs';
import { catchError,tap,map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { Group , GroupsWithUser } from '../../shared/group';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsUrl:string = environment.appUrl;

   obj:any =environment.headers;


  constructor(private http: HttpClient) { 
    console.log(environment.appUrl);
  }

  getGroups(): Observable<Group[]> {
    const headers = new HttpHeaders(this.obj);
    return this.http.get<Group[]>(this.groupsUrl+"api/groups",{headers}).pipe(
        // tap(data=>console.log(data)),
        catchError(this.handleError)
      );
  }

  joinGroup(id: number,user_id:number): Observable<Group> {
    const headers = new HttpHeaders(this.obj);

    const url = this.groupsUrl+`api/groups/join/${id}`;

    return this.http.get<Group>(url,{headers}).pipe(
        tap(data=>console.log(data)),
        catchError(this.handleError)
      );
  }

  getGroupMembers(id:number): Observable<User[]>{
    const url = this.groupsUrl+`api/groups/join/${id}`;
    const headers = new HttpHeaders(this.obj);

    return this.http.get<User[]>(url,{headers}).pipe(
        tap(data=>console.log('Group Members')),
        catchError(this.handleError)
      );
  }

  // getGroups(): Observable<GroupsWithUser> {
  //   const headers = new HttpHeaders(this.obj);
  //   return this.http.get<GroupsWithUser>(this.groupsUrl+"/users/user/me/groups",{headers}).pipe(
  //       tap(data=>console.log(data)),
  //       catchError(this.handleError)
  //     );
  // }



 createGroup(group: Group): Observable<Group> {
    const headers = new HttpHeaders(this.obj);
    return this.http.post<Group>(this.groupsUrl + "api/groups", group, { headers })
      .pipe(
        tap(data => console.log('createGroup: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getGroup(id:number): Observable<Group>{
    if (id === 0) {
      return of(this.initializeGroup());
    }
    const headers = new HttpHeaders(this.obj);
    const url = this.groupsUrl+`api/groups/${id}`;
    
    return this.http.get<Group>(url,{headers})
      .pipe(
        tap(data => console.log('get Group: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  
  updateGroup(group: Group): Observable<Group> {
    const headers = new HttpHeaders(this.obj);
    const url = this.groupsUrl+`api/groups/${group.id}`;

    return this.http.put<Group>(url, group, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + group.id)),
        // Return the group upon update
        map(() => group),
        catchError(this.handleError)
      );
  }


  private handleError(err){
    let errorMessage:string;
    if (err.error instanceof ErrorEvent) {

      // errorMessage = `An error occurred: ${err.error.message}`;
    }else{
      // errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    errorMessage = "error occurred.";
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeGroup():Group {
    return {
      id:0,
      name:null,
      description:null,
      created_by:0
    }
  }


  deleteGroup(id: number): Observable<{}> {
    const headers = new HttpHeaders(this.obj);
    const url = this.groupsUrl+`api/groups/${id}`;
    // console.log(url);
    return this.http.delete<Group>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }
}
