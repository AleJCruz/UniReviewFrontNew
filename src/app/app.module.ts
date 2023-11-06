import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NvbarComponent } from './component/nvbar/nvbar.component';
import {MatMenuModule} from "@angular/material/menu";
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';
import { PerfilComponent } from './component/user/perfil/perfil.component';
import { ListteacherComponent } from './component/user/listteacher/listteacher.component';
import { ListUniversitiesComponent } from './component/user/list-universities/list-universities.component';
import {QualificationteacherComponent} from "./component/user/qualificationteacher/qualificationteacher.component";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NvbarComponent,
    HomeComponent,
    UserComponent,
    PerfilComponent,
    ListteacherComponent,
    ListUniversitiesComponent,
    QualificationteacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
