import { Router } from '@angular/router';


import { Injectable } from '@angular/core';
import { IGroup } from '../../shared/Igroup';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: IGroup[] = [
    {
      "id": 3,
      "name": 'developers',
      "memberCount": 40,
      "user_id":1
    },
    {
      "id": 4,
      "name": "Marketing",
      "memberCount": 20,
      "user_id":1
    }
  ];
  constructor() { }

  newGroup(obj:IGroup): void {
    this.groups.unshift(obj);
  }

  deleteGroup(id:number): void{
    this.groups = this.groups.filter(a=>a.id !==id);
  }

  getGroup(id:number): IGroup{
    let obj= this.groups.find(item => item.id === id);
    return obj;
  }

  updateGroup(id:number, name:string):void {
    this.groups = this.groups.map((item)=>{
      if (item.id==id) {
        item.name =name;
      }
      return item
    });

    console.log(this.groups);
  }
}
