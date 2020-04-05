import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { IndexComponent } from './index/index.component';
import { GroupComponent } from './group/group.component';
import { MemberGroupComponent } from './group/member-group.component';
import { UserComponent } from './user/user.component';
import {AuthGuard} from './auth.guard';
import { GroupResolver } from './group/group-resolver.service';

const routes: Routes = [
  {path:'sign-in' , component : SignInComponent},
  {path:'sign-up' , component : SignUpComponent},
  {
  	path: 'group/:id/members', 
  	canActivate:[AuthGuard],
  	component : MemberGroupComponent
  },  
  {
  	path : 'groups' ,
  	component :GroupComponent,
  	canActivate:[AuthGuard],
  	resolve: { resolvedData: GroupResolver }
  },
  {path:'users' , component : UserComponent},
  {path:'',component: SignUpComponent , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
