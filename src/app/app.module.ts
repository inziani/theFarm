import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faEdit } from '@fortawesome/free-solid-svg-icons';


import { HomeComponent } from './shared/home/home.component';
import { TodoComponent } from './shared/home/todo/todo.component';
import { LoginComponent } from './shared/home/login/login.component';
import { SignupComponent } from './shared/home/signup/signup.component';
import { HeaderComponent } from './core/header/header.component';
import { appRoutingModule } from './app-routing.module';
import { ProfileComponent } from './shared/home/profile/profile.component';
import { EditActivityComponent } from './shared/home/edit-activity/edit-activity.component';
import { DowndownDirective } from './shared/directives/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ProfileComponent,
    EditActivityComponent,
    DowndownDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    appRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary){
    library.addIcons(faSquare, faEdit);

  }
 }
