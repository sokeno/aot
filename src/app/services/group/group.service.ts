import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable ,of,throwError } from 'rxjs';
import { catchError,tap,map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Group } from '../../shared/group';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupsUrl ='api/groups';

  constructor(private http: HttpClient) { 
    console.log(environment.appUrl);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl).pipe(
        tap(data=>console.log(data)),
        catchError(this.handleError)
      );
  }

 createGroup(group: Group): Observable<Group> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    group.id = null;
    return this.http.post<Group>(this.groupsUrl, group, { headers })
      .pipe(
        tap(data => console.log('createGroup: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getGroup(id:number): Observable<Group>{
    if (id === 0) {
      return of(this.initializeGroup());
    }
    const url = `${this.groupsUrl}/${id}`;
    return this.http.get<Group>(url)
      .pipe(
        tap(data => console.log('get Group: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  
  updateGroup(group: Group): Observable<Group> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.groupsUrl}/${group.id}`;
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
      errorMessage = `An error occurred: ${err.error.message}`;
    }else{
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeGroup():Group {
    return {
      id:0,
      name:null,
      description:null,
      memberCount:0,
      user_id:0
    }
  }


  deleteGroup(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.groupsUrl}/${id}`;
    return this.http.delete<Group>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }
}
