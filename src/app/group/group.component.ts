import { Component, OnInit } from '@angular/core';
import { IGroup } from '../shared/Igroup';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  pageTitle: string = "Groups";

  name:string = "";

  errorMessage : string = "";

  switchForm: boolean = false;

  groups: IGroup[] = [
    {
      "id":3,
      "name": 'developers',
      "memberCount": 40
    },
    {
      "id":4,
      "name": "Marketing",
      "memberCount": 20
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  validateField(): boolean {
    return this.name.trim()=="" ? false : true;
  }

  newGroup() : void{
    if (this.validateField()) {
      
    }else{
      this.errorMessage = "Enter a new name";
    }
    console.log(this.name);
  }

}
