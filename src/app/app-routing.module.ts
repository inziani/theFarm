import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditActivityComponent } from "./core/application-components/edit-activity/edit-activity.component";

import { AppComponent } from "./app.component";
import { AppComponent as FinanceAppComponent } from "projects/finance/src/app/app.component";
import { HomePageComponent } from "./core/home-page/home-page.component";
import { LoginComponent } from "./core/authentication/login/login.component";
import { ProfileComponent } from "./core/application-components/profile/profile.component";
import { SignupComponent } from "./core/authentication/signup/signup.component";
import { TodoComponent } from "./core/application-components/todo/todo.component";
import { AuthenticationGuard } from "./_helpers/authentication.guard";
import { ActivityCategorysComponent } from "./core/application-components/activity-categorys/activity-categorys.component";
import { FinanceSharedModule } from "../../projects/finance/src/app/app.module";
import { SalesSharedModule } from "projects/sales/src/app/app.module";
import { MaterialsManagementSharedModule } from "projects/materials-management/src/app/app.module";
import { HumanResourcesSharedModule } from "projects/human-resources/src/app/app.module";
import { ProjectsHomepageComponent } from "projects/project-management/src/app/projects-homepage/projects-homepage.component";
import { FinanceHomepageComponent } from "projects/finance/src/app/finance-homepage/finance-homepage.component";
import { GlHomepageComponent } from "projects/finance/src/app/general-ledger/gl-homepage/gl-homepage.component";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { AuthenticationLayoutComponent } from "./authentication-layout/authentication-layout.component";



const appRoutes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
      { path: 'activity', component: TodoComponent, canActivate: [AuthenticationGuard] },
      { path: 'newActivity', component: EditActivityComponent, canActivate: [AuthenticationGuard] },
      { path: 'activityCategory', component: ActivityCategorysComponent, canActivate: [AuthenticationGuard] },
    ]
  },
  {
    path: '', component: AuthenticationLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
  ]},


// Different layout pages for the different modules
  {
    path: 'finance', component: FinanceAppComponent, children:[
    { path:  '', loadChildren:() => import('../../projects/finance/src/app/app.module').then(m =>m.AppModule)  , canActivate: [AuthenticationGuard]}
  ]},

  { path: 'sales', loadChildren: '../../projects/sales/src/app/app.module#SalesSharedModule' },
  { path: 'humanResources', loadChildren: '../../projects/human-resources/src/app/app.module#HumanResourcesSharedModule' },
  { path: 'projectManagement', loadChildren: '../../projects/project-management/src/app/app.module#ProjectManagementSharedModule' },
  { path: 'materialsManagement', loadChildren: '../../projects/materials-management/src/app/app.module#MaterialsManagementSharedModule' },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomePageComponent }
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    FinanceSharedModule.forRoot(),
    SalesSharedModule.forRoot()
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
