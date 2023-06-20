import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

import { canMatchModulesGuard } from './_helpers/authentication.guard';
import { BrowserModule } from '@angular/platform-browser';
import { UnauthorizedServeResponseComponent } from './shared/user-feedback-dialogues/unauthorized-serve-response/unauthorized-serve-response.component';

const AppRoutes: Routes = [
  {
    // Authentication
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
  {
    path: 'profile',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: 'unauthorized', component: UnauthorizedServeResponseComponent },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
