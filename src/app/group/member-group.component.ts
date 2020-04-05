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


  removeMember(id:number):void{
  	console.log('remove member:', id);
  }

  onGroupMembersRetrieved(data:any):void{
  	console.log('Group members : ',data);
  }

}
