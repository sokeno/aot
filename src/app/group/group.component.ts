import { Component, OnInit } from '@angular/core';
import { IGroup } from '../shared/Igroup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  pageTitle: string = "Groups";

  name: string = "";

  errorMessage: string = "";

  switchForm: boolean = false;

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
  constructor(private router: Router, ) { }

  ngOnInit(): void {
  }

  validateField(): boolean {

    if (this.groups.some(group => group.name == this.name)) return false;

    return this.name.trim() == "" ? false : true;
  }

  newGroup(): void {
    if (this.validateField()) {

      let obj: IGroup = {
        "id": Date.now(),
        "name": this.name,
        "memberCount": 0
      };

      this.name = "";

      this.errorMessage = "Group added successfully";

      setTimeout(()=>{
        this.errorMessage = "";
      },1000);

      this.groups.unshift(obj);


    } else {
      this.errorMessage = "Enter unique name";
    }
    console.log(this.name);
  }

}
