import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { IndexComponent } from './index/index.component';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';

import { GroupResolver } from './group/group-resolver.service';

const routes: Routes = [
  {path:'sign-in' , component : SignInComponent},
  {path:'sign-up' , component : SignUpComponent},
  {path : 'groups' , component :GroupComponent,resolve: { resolvedData: GroupResolver }},
  {path:'users' , component : UserComponent},
  {path:'',component: SignUpComponent , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
