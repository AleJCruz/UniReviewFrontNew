import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./component/register/register.component";
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {UserComponent} from "./component/user/user.component";
import {PerfilComponent} from "./component/user/perfil/perfil.component";
import {ListteacherComponent} from "./component/user/listteacher/listteacher.component";
import {ListUniversitiesComponent} from "./component/user/list-universities/list-universities.component";
import {QualificationteacherComponent} from "./component/user/qualificationteacher/qualificationteacher.component";


const routes: Routes = [
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'landing', component:HomeComponent
  },
  {
    path:'user', component:UserComponent, children: [
      {
        path: 'profile', component: PerfilComponent
      },
      {
        path: 'teachers', component: ListteacherComponent
      },
      {
        path: 'universities', component:ListUniversitiesComponent
      },
      {
        path: '', component:ListUniversitiesComponent
      },
      {
        path: 'funateacher/:id', component:QualificationteacherComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
