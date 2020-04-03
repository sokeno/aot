import { Component, OnInit } from '@angular/core';
import { IGroup } from '../shared/Igroup';
import { Router } from '@angular/router';
import  {GroupService} from '../services/group/group.service'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  pageTitle: string = "Groups";

  name: string = "";

  errorMessage: string = "";

  search:string = "";

  switchForm: boolean = false;

  groupId:number ;

  edit: boolean = false;

  groups: IGroup[];


  constructor(private router: Router, private groupService :GroupService ) { }

  ngOnInit(): void {
    this.groups= this.groupService.groups;
  }

  validateField(): boolean {
    if (this.groups.some(group => group.name == this.name)) return false;
    return this.name.trim() == "" ? false : true;
  }

  addNew(): void{
    if (this.validateField()) {

      if (this.edit) {
        let id :number = this.groupId;

        let name:string = this.name;

        this.groupService.updateGroup(id, name);

        this.errorMessage = "Update successfully";

        

        setTimeout(()=>{
          this.edit =false;

          this.groups = this.groupService.groups;

          this.errorMessage = "";

          this.switchForm=false;

          this.name ="";
        },1000);

      }else{
          let obj: IGroup = {
            "id": Date.now(),
            "name": this.name,
            "memberCount": 0,
            "user_id":1
          };

          this.groupService.newGroup(obj);

          this.name = "";

          this.errorMessage = "Group added successfully";

          setTimeout(() => {
            this.errorMessage = "";
          }, 1000);

      }


    }else {
      this.errorMessage = "Enter unique name";
    }
  }


  switchData() :void{

    this.edit =false;

    this.pageTitle = "Groups" ;
    this.name ="";

    if (this.switchData) {
      this.groups=this.groupService.groups;
    }

    this.switchForm=!this.switchForm;
  }

  removeGroup(id:number):void {
    if (confirm("Are you sure , you want to delete group")) {
      this.groupService.deleteGroup(id);
      this.groups = this.groupService.groups;
    }
  }

  editGroup(id:number): void{
    this.edit = true;

    let group = this.groupService.getGroup(id);

    this.name = group.name;

    this.groupId =group.id;

    // console.log(group);

    this.pageTitle = "Edit Group";
    this.switchForm =true;
  }

  searchGroup(): void{

  }


}
