import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from '@app/_helpers/authentication.guard';
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

const routes: Routes = [

  {
    // Activity Module layout
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
    ],
  },

  // Profile layout
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [canActivate],
      },
      {
        path: 'activity',
        component: TodoComponent,
        canActivate: [canActivate],
      },
      {
        path: 'newActivity',
        component: EditActivityComponent,
        canActivate: [canActivate],
      },
      {
        path: 'activityCategory',
        component: ActivityCategorysComponent,
        canActivate: [canActivate],
      },
      {
        path: 'roleauth',
        component: RoleAuthComponent,
        canActivate: [canActivate],
      },
      {
        path: 'bio',
        component: BioComponent,
        canActivate: [canActivate],
      },
      {
        path: 'security',
        component: PasswordSecComponent,
        canActivate: [canActivate],
      },
    ],
    canActivate: [canActivate],
  },

  {
    // Authentication Module layout
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  }

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
