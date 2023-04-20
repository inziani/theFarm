import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";
import { EditActivityComponent } from "./core/application-components/edit-activity/edit-activity.component";

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./core/home-page/home-page.component";
import { LoginComponent } from "./core/authentication/login/login.component";
import { ProfileComponent } from "./core/application-components/profile/profile.component";
import { SignupComponent } from "./core/authentication/signup/signup.component";
import { TodoComponent } from "./core/application-components/todo/todo.component";
import { AuthenticationGuard } from "./_helpers/authentication.guard";
import { ActivityCategorysComponent } from "./core/application-components/activity-categorys/activity-categorys.component";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { AuthenticationLayoutComponent } from "./authentication-layout/authentication-layout.component";
import { FinanceLayoutComponent } from "./finance/finance-layout/finance-layout.component";
import { FinanceHomeComponent } from "./finance/finance-home/finance-home.component";
import { GlMasterDataComponent } from "./finance/general-ledger/gl-master-data/gl-master-data.component";
import { RoleAuthComponent } from "./core/application-components/profile/role-auth/role-auth.component";
import { BioComponent } from "./core/application-components/profile/bio/bio.component";
import { PasswordSecComponent } from "./core/application-components/profile/password-sec/password-sec.component";
import { ProfileLayoutComponent } from "./profile-layout/profile-layout.component";
import { GlTransactionCodesComponent } from "./finance/general-ledger/gl-transaction-codes/gl-transaction-codes.component";

const appRoutes: Routes = [

  {
    // Activity Module layout
    path: '', component: AppLayoutComponent, children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
    ]
  },

  // Profile layout
  {
    path: '', component: ProfileLayoutComponent, children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
      { path: 'activity', component: TodoComponent, canActivate: [AuthenticationGuard] },
      { path: 'newActivity', component: EditActivityComponent, canActivate: [AuthenticationGuard] },
      { path: 'activityCategory', component: ActivityCategorysComponent, canActivate: [AuthenticationGuard] },
      { path: 'roleauth', component: RoleAuthComponent, canActivate: [AuthenticationGuard] },
      { path: 'bio', component: BioComponent, canActivate: [AuthenticationGuard] },
      { path: 'security', component: PasswordSecComponent, canActivate: [AuthenticationGuard] }

    ], canActivate: [AuthenticationGuard]
  },

  {
    // Authentication Module layout
    path: '', component: AuthenticationLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  // Finance Module Layout
  {
    path: '', component: FinanceLayoutComponent, children: [
      { path: 'finance', component: FinanceHomeComponent, canActivate: [AuthenticationGuard] },
      { path: 'glmasterdata', component: GlMasterDataComponent, canActivate: [AuthenticationGuard] },
      { path: 'glhome', component: GlTransactionCodesComponent, canActivate: [AuthenticationGuard]}


   ], canActivate: [AuthenticationGuard]},

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomePageComponent }
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
