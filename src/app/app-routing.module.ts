import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { canMatchModulesGuard } from './_helpers/guards/authentication.guard';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorsComponent } from './errors/errors.component';

const AppRoutes: Routes = [
  {
    // Authentication
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  // Finance
  {
    path: 'finance',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./features/finance/finance-layout/finance-layout.module').then(
        (m) => m.FinanceLayoutModule
      ),
  },
  // Sales
  {
    path: 'sales',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./features/sales/sales.module').then((m) => m.SalesModule),
  },

  // Shared
  {
    path: 'shared',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  // Profile
  {
    path: 'profileUrl',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  // Human Resources
  {
    path: 'human-resources',
    canMatch: [canMatchModulesGuard],
    loadChildren: () =>
      import('./features/human-resources/human-resources.module').then(
        (m) => m.HumanResourcesModule
      ),
  },
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'un-authorized',
    component: ErrorsComponent,
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: ErrorsComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
    component: ErrorsComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, { enableTracing: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
