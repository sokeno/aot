import { Component, OnInit } from '@angular/core';
import { IGroup } from '../shared/Igroup';
import { FormGroup, FormControl } from  "@angular/forms";
import { Router } from '@angular/router';
import  {GroupService} from '../services/group/group.service'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupForm :FormGroup;

  pageTitle: string = "Groups";

  loggedInUserID:number;

  infoMessage: string = "";

  search:string = "";

  switchForm: boolean = false;

  groupId:number ;

  edit: boolean = false;

  groups: IGroup[];


  constructor(private router: Router, private groupService :GroupService ) { }

  ngOnInit(): void {
    this.groups= this.groupService.groups;
    this.loggedInUserID =this.groupService.userId;

    this.groupForm = new FormGroup({
      name:new FormControl(),
      description:new FormControl(),
    });
  }

  addGroup(): void{
    let formValues =this.groupForm.value;
    if (this.edit) {
      let id :number = this.groupId;

      this.groupService.updateGroup(id, formValues.name, formValues.description);

      this.infoMessage = "Update successfully";

      setTimeout(()=>{
        this.groups = this.groupService.groups;
        this.clearForm();          
      },1000);

    }else{

        let obj: IGroup = {
          "id": Date.now(),
          "name": formValues.name,
          "memberCount": 0,
          "description":formValues.description,
          "user_id":1
        };

        this.groupService.newGroup(obj);
        this.infoMessage = "Group added successfully";

        setTimeout(() => {
          this.clearForm();
        }, 1000);

    }
    
  }

  clearForm():void{
    this.groupForm.reset();
    this.pageTitle = "Groups";
    if (this.edit) {
      this.switchForm=false;
      this.edit =false;
    }
    this.infoMessage = "";
  }


  switchData() :void{

    this.edit =false;

    this.pageTitle = "Groups" ;
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

    this.groupForm.setValue({
      name:group.name,
      description:group.description
    });

    this.groupId =group.id;

    this.pageTitle = "Edit Group";
    this.switchForm =true;
  }

  searchGroup(): void{
    this.groups=this.groupService.groups;
    if (this.search.trim() === "") {
      this.groups=this.groupService.groups;
    }else{
      this.groups = this.groups.filter((group:IGroup)=>group.name.toLocaleLowerCase().indexOf(this.search)!==-1);
    }

  }

  joinGroup(id:number):void{
    console.log(id);
  }


}
