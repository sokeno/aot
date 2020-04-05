import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Group,GroupsWithUser } from '../shared/group';
import  {GroupService} from '../services/group/group.service';
import { UserService } from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class GroupResolver implements Resolve<GroupsWithUser> {

  constructor(private groupService:GroupService, private userService: UserService){

  }
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):Observable<GroupsWithUser>{
  	return this.groupService.getGroups();
  }
}
