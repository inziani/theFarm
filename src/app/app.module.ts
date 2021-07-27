import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './core/services/users.service';


import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';


import { HomeComponent } from './shared/home/home.component';
import { TodoComponent } from './shared/home/todo/todo.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
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
    FormsModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary){
    library.addIcons(faSquare, faEdit, faTrash, faPlus);

  }
 }
