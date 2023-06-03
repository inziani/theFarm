import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileComponent } from './core/application-components/profile/profile.component';
import {
  authenticationGuard,
  canMatchModulesGuard,
} from './_helpers/authentication.guard';
import { TodoComponent } from './core/application-components/todo/todo.component';
import { EditActivityComponent } from './core/application-components/edit-activity/edit-activity.component';
import { ActivityCategorysComponent } from './core/application-components/activity-categorys/activity-categorys.component';
import { RoleAuthComponent } from './core/application-components/profile/role-auth/role-auth.component';
import { BioComponent } from './core/application-components/profile/bio/bio.component';
import { PasswordSecComponent } from './core/application-components/profile/password-sec/password-sec.component';
import { BrowserModule } from '@angular/platform-browser';
import { UnauthorizedServeResponseComponent } from './shared/unauthorized-serve-response/unauthorized-serve-response.component';

const AppRoutes: Routes = [
  // Home Page layout
  {
    path: '',
    component: AppLayoutComponent,
    children: [{ path: 'home', component: HomePageComponent }],
  },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'finance',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./features/finance/finance-layout/finance-layout.module').then(
        (m) => m.FinanceLayoutModule
      ),
  },
  {
    path: 'sales',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./features/sales/sales.module').then((m) => m.SalesModule),
  },
  {
    path: 'shared',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
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
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  // Unauthorized Paths
  { path: 'unauthorized', component: UnauthorizedServeResponseComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
