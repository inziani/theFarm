import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { appRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { UsersService } from './core/services/users.service';
import { AuthenticationService } from './core/services/authentication.service';
import { NavigationServiceService } from './core/services/navigation-service.service';
import { RestDataSource } from './shared/data/rest.datasource';
import { DowndownDirective } from './shared/directives/dropdown.directive';
import { JwtInterceptor } from './_helpers/jwt.interceptor';





import { GoogleMapsModule } from '@angular/google-maps'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faEdit, faTrash, faPlus, faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { TodoComponent } from './shared/home/todo/todo.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './shared/home/profile/profile.component';
import { EditActivityComponent } from './shared/home/edit-activity/edit-activity.component';
import { LoadingSpinnerComponent } from './shared/home/loading-spinner/loading-spinner';
import { ActivityCategorysComponent } from './shared/home/activity-categorys/activity-categorys.component';
import { FooterComponent } from './core/footer/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { ModulesComponent } from './modules/modules.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';






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
    DowndownDirective,
    LoadingSpinnerComponent,
    ActivityCategorysComponent,
    FooterComponent,
    SideNavComponent,
    ModulesComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    appRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    GoogleMapsModule

  ],
  providers: [UsersService, AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, RestDataSource, NavigationServiceService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faEdit, faTrash, faPlus, faHome, faTwitter, faLinkedin, faTelegram, faBars, faWhatsapp);

  }
}
