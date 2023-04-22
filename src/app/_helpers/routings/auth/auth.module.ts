import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.module';
import { AppLayoutComponent } from '@app/app-layout/app-layout.component';
import { AuthenticationLayoutComponent } from '@app/authentication-layout/authentication-layout.component';
import { ActivityCategorysComponent } from '@app/core/application-components/activity-categorys/activity-categorys.component';
import { EditActivityComponent } from '@app/core/application-components/edit-activity/edit-activity.component';
import { BioComponent } from '@app/core/application-components/profile/bio/bio.component';
import { PasswordSecComponent } from '@app/core/application-components/profile/password-sec/password-sec.component';
import { ProfileComponent } from '@app/core/application-components/profile/profile.component';
import { RoleAuthComponent } from '@app/core/application-components/profile/role-auth/role-auth.component';
import { TodoComponent } from '@app/core/application-components/todo/todo.component';
import { LoginComponent } from '@app/core/authentication/login/login.component';
import { SignupComponent } from '@app/core/authentication/signup/signup.component';
import { HomePageComponent } from '@app/core/home-page/home-page.component';
import { ProfileLayoutComponent } from '@app/profile-layout/profile-layout.component';
import { SideNavComponent } from '@app/core/side-nav/side-nav.component';
import { HeaderComponent } from '@app/core/header/header.component';
import { HomeSidenavComponent } from '@app/core/home-sidenav/home-sidenav.component';
import { FooterComponent } from '@app/core/footer/footer.component';
import { ProfileSidenavComponent } from '@app/core/application-components/profile/profile-sidenav/profile-sidenav.component';
import { ModulesComponent } from './../../../core/modules/modules.component'
import { LoadingSpinnerComponent } from '@app/_helpers/loading-spinner/loading-spinner.component';
import { AccountSettingsComponent } from '@app/core/application-components/profile/account-settings/account-settings.component';


@NgModule({
  declarations: [
    AppLayoutComponent,
    SideNavComponent,
    HeaderComponent,
    AuthenticationLayoutComponent,
    ActivityCategorysComponent,
    EditActivityComponent,
    BioComponent,
    PasswordSecComponent,
    ProfileComponent,
    RoleAuthComponent,
    TodoComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    ProfileLayoutComponent,
    HomeSidenavComponent,
    FooterComponent,
    ProfileSidenavComponent,
    ModulesComponent,
    LoadingSpinnerComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthModule {}
