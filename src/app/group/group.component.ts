import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/group';
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

  errorMessage:string ="";

  group:Group;

  search:string = "";

  switchForm: boolean = false;

  groupId:number ;

  edit: boolean = false;

  groups: Group[] =[];


  constructor(private router: Router, private groupService :GroupService ) { }

  ngOnInit(): void {
    this.groups= this.groupService.groups;
    this.loggedInUserID =this.groupService.userId;

    this.groupForm = new FormGroup({
      name:new FormControl(),
      description:new FormControl(),
    });

    this.fetchGroups();
  }

  fetchGroups(): void{
    this.groupService.getGroups().subscribe({
      next:groups =>{
        this.groups = groups;
      },
      error:err=>this.errorMessage = err
    });
  }

  saveGroup():void{
    const g ={...this.group, ...this.groupForm.value};
    console.info("g", g);
    if (this.edit) {
      // Edit group
      this.groupService.updateGroup(g).subscribe({
        next:()=>this.clearForm(),
        error:err=>this.infoMessage=err
      })
    }else{
      // Create group
      this.groupService.createGroup(g).subscribe({
        next:()=>this.clearForm(),
        error:err=>this.infoMessage=err
      })
    }

  }

  clearForm():void{
    setTimeout(()=>{
      this.groupForm.reset();
      this.pageTitle = "Groups";
      if (this.edit) {
        this.switchForm=false;
        this.edit =false;
      }
      this.infoMessage = "";
    },1000);
  }


  switchData() :void{

    this.edit =false;

    this.pageTitle = "Groups" ;
    if (this.switchData) {
      this.fetchGroups();
    }
    this.switchForm=!this.switchForm;
  }

  removeGroup(id:number):void {
    if (confirm("Are you sure , you want to delete group")) {
      this.groupService.deleteGroup(id);
      this.groups = this.groupService.groups;
    }
  }


  getGroup(id: number): void {
    this.groupService.getGroup(id)
      .subscribe({
        next: (group: Group) => this.displayGroup(group),
        error: err => this.errorMessage = err
      });
  }

  displayGroup(group:Group): void{

    if (this.groupForm) {
      this.groupForm.reset();
    }
    this.group = group; 
    
    this.edit = true;

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
      this.groups = this.groups.filter((group:Group)=>group.name.toLocaleLowerCase().indexOf(this.search)!==-1);
    }

  }

  joinGroup(id:number):void{
    console.log(id);
  }


}
