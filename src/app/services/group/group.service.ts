import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable ,of,throwError } from 'rxjs';
import { catchError,tap,map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Group } from '../../shared/group';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: Group[] ;

  userId:number = 1;

  private groupsUrl ='api/groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {

  }

  newGroup(obj:Group): void {
    this.groups.unshift(obj);
  }

  deleteGroup(id:number): void{
    this.groups = this.groups.filter(a=>a.id !==id);
  }

  getGroup(id:number): Group{
    let obj= this.groups.find(item => item.id === id);
    return obj;
  }

  updateGroup(id:number, name:string, description:string):void {
    this.groups = this.groups.map((item)=>{
      if (item.id==id) {
        item.name =name;
        item.description =description;
      }
      return item
    });
  }
}
