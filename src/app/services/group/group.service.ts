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
      "name": "Developers",
      "memberCount": 40,
      "description":"computer programming staffs",
      "user_id":1
    },
    {
      "id": 4,
      "name": "Marketing",
      "memberCount": 20,
      "description":"Digital marking and social media team",
      "user_id":1
    },
    {
      "id":5,
      "name" : "Rap Battle",
      "memberCount":20,
      "description":"persons that rap hiphop",
      "user_id":2
    },
    {
      "id":6,
      "name" : "Teacher",
      "memberCount":20,
      "description":"Persons that teach",
      "user_id":2
    },
    {
      "id":7,
      "name" : "Thugs",
      "memberCount":21,
      "description":"They terrorize the streets",
      "user_id":2
    },
  ];

  userId:number = 1;

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

  updateGroup(id:number, name:string, description:string):void {
    this.groups = this.groups.map((item)=>{
      if (item.id==id) {
        item.name =name;
        item.description =description;
      }
      return item
    });

    // console.log(this.groups);
  }
}
