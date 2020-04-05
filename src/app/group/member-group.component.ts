import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { ActivatedRoute } from '@angular/router';
import  {GroupService} from '../services/group/group.service';

@Component({
  selector: 'app-member-group',
  templateUrl: './member-group.component.html',
  styleUrls: ['./member-group.component.css']
})
export class MemberGroupComponent implements OnInit {

	pageTitle:string = "Members";
	users:User[] =[];

  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.getMembers(id);
  }


  getMembers(id:number){
  	this.groupService.getGroupMembers(id).subscribe({
  		next:data=>this.onGroupMembersRetrieved(data),
  		error:err=>console.log(err)
  	})
  }


  removeMember(user_id:number):void{
  	
  	let group_id=+this.route.snapshot.paramMap.get('id');
  	if (confirm("Are you sure , you want to remove this member?")) {
  		this.groupService.deleteGroupMember(user_id,group_id).subscribe({
  			next:(data)=>{
  				this.getMembers(group_id)
  			},
  			error:(err)=>{
  				this.getMembers(group_id);
  				// alert('Backend server error')
  			}
  		});
  	}

  	console.log('groupId: ', group_id, "\n userId",user_id);
  }

  onGroupMembersRetrieved(data:any):void{
  	this.users=data.users;

  	console.log('Group members : ',data);
  }

}
