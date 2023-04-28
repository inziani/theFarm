import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileComponent } from './core/application-components/profile/profile.component';
import { authenticationGuard, canMatchModulesGuard } from './_helpers/authentication.guard';
import { TodoComponent } from './core/application-components/todo/todo.component';
import { EditActivityComponent } from './core/application-components/edit-activity/edit-activity.component';
import { ActivityCategorysComponent } from './core/application-components/activity-categorys/activity-categorys.component';
import { RoleAuthComponent } from './core/application-components/profile/role-auth/role-auth.component';
import { BioComponent } from './core/application-components/profile/bio/bio.component';
import { PasswordSecComponent } from './core/application-components/profile/password-sec/password-sec.component';
import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    // Home Page layout

    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
    ],
  },

  //  Profile layout
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'activity',
        component: TodoComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'newActivity',
        component: EditActivityComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'activityCategory',
        component: ActivityCategorysComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'roleauth',
        component: RoleAuthComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'bio',
        component: BioComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'security',
        component: PasswordSecComponent,
        canActivate: [authenticationGuard],
      },
    ],
    canActivate: [authenticationGuard],
  },

  {
    // Authentication Module layout
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'finance',
    loadChildren: () =>
      import('./finance/finance.module').then((m) => m.FinanceModule),
    canMatch: [canMatchModulesGuard],
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./sales/sales.module').then((m) => m.SalesModule),
    canMatch: [canMatchModulesGuard],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
