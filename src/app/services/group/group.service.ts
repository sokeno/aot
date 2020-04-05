import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { 
    console.log(environment.appUrl);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl+"api/groups").pipe(
        // tap(data=>console.log(data))
      );
  }

  joinGroup(id: number,user_id:number): Observable<Group> {

    const url = this.groupsUrl+`api/groups/join/${id}`;

    return this.http.get<Group>(url).pipe(
        tap(data=>console.log(data))
      );
  }

  getGroupMembers(id:number): Observable<User[]>{
    const url = this.groupsUrl+`api/groups/${id}`;

    return this.http.get<User[]>(url).pipe(
        tap(data=>console.log('Group Members'))
      );
  }

 createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl + "api/groups", group )
      .pipe(
        tap(data => console.log('createGroup: ' + JSON.stringify(data)))
      );
  }

  getGroup(id:number): Observable<Group>{
    if (id === 0) {
      return of(this.initializeGroup());
    }
    const url = this.groupsUrl+`api/groups/${id}`;
    
    return this.http.get<Group>(url)
      .pipe(
        tap(data => console.log('get Group: ' + JSON.stringify(data)))
      );
  }

  
  updateGroup(group: Group): Observable<Group> {
    const url = this.groupsUrl+`api/groups/${group.id}`;

    return this.http.put<Group>(url, group)
      .pipe(
        tap(() => console.log('updateProduct: ' + group.id)),
        // Return the group upon update
        map(() => group)
      );
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
    const url = this.groupsUrl+`api/groups/${id}`;
    return this.http.delete<Group>(url)
      .pipe(
        tap(data => console.log('delete Group : ' + id))
      );
  }

  deleteGroupMember(user_id: number,group_id:number): Observable<{}> {
    const url = this.groupsUrl+`api/groups/remove/${user_id}/${group_id}`;
    return this.http.get<{}>(url)
      .pipe(
        tap(data => console.log('delete member: ' + user_id))
      );
  }
}
