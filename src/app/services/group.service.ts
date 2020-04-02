import { Router } from '@angular/router';


import { Injectable } from '@angular/core';
import { IGroup } from '../shared/Igroup';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: IGroup[] = [
    {
      "id": 3,
      "name": 'developers',
      "memberCount": 40
    },
    {
      "id": 4,
      "name": "Marketing",
      "memberCount": 20
    }
  ];
  constructor() { }

  newGroup(obj:IGroup): void {
    this.groups.unshift(obj);
  }

  deleteGroup(id:number): void{
    this.groups = this.groups.filter(a=>a.id !==id);
  }
}
