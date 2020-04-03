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

  loggedInUserID:number;

  name: string = "";

  description: string = "";

  errorMessage: string = "";

  search:string = "";

  switchForm: boolean = false;

  groupId:number ;

  edit: boolean = false;

  groups: IGroup[];


  constructor(private router: Router, private groupService :GroupService ) { }

  ngOnInit(): void {
    this.groups= this.groupService.groups;
    this.loggedInUserID =this.groupService.userId;
  }

  validateField(): boolean {
    if (this.groups.some(group => group.name == this.name) && this.edit ==false) return false;
    return this.name.trim() == "" ? false : true;
  }

  addNew(): void{
    if (this.validateField()) {

      if (this.edit) {
        let id :number = this.groupId;

        let name:string = this.name;

        let description: string =this.description;

        this.groupService.updateGroup(id, name, description);

        this.errorMessage = "Update successfully";

        

        setTimeout(()=>{
          this.groups = this.groupService.groups;
          this.clearForm();          
        },1000);

      }else{
          let obj: IGroup = {
            "id": Date.now(),
            "name": this.name,
            "memberCount": 0,
            "description":this.description,
            "user_id":1
          };

          this.groupService.newGroup(obj);
          this.errorMessage = "Group added successfully";

          setTimeout(() => {
            this.clearForm();
          }, 1000);

      }


    }else {
      this.errorMessage = "Enter unique name";
    }
  }

  clearForm():void{
    this.pageTitle = "Groups";
    this.errorMessage ="";
    this.name ="";
    this.description = "";
    if (this.edit) {
      this.switchForm=false;
      this.edit =false;
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

    this.description =group.description;

    // console.log(group);

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
