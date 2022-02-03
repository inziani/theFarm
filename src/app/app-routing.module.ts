import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditActivityComponent } from "./core/application-components/edit-activity/edit-activity.component";
import { HomePageComponent } from "./core/home-page/home-page.component";
import { LoginComponent } from "./core/authentication/login/login.component";
import { ProfileComponent } from "./core/application-components/profile/profile.component";
import { SignupComponent } from "./core/authentication/signup/signup.component";
import { TodoComponent } from "./core/application-components/todo/todo.component";
import { AuthenticationGuard } from "./_helpers/authentication.guard";
import { ActivityCategorysComponent } from "./core/application-components/activity-categorys/activity-categorys.component";
import { FinanceSharedModule } from "projects/finance/src/app/app.module";
import { SalesSharedModule } from "projects/sales/src/app/app.module";
import { MaterialsManagementSharedModule } from "projects/materials-management/src/app/app.module";
import { HumanResourcesSharedModule } from "projects/human-resources/src/app/app.module";
import { ProjectsHomepageComponent } from "projects/project-management/src/app/projects-homepage/projects-homepage.component";



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'activity', component: TodoComponent, canActivate: [AuthenticationGuard] },
  { path: 'newActivity', component: EditActivityComponent, canActivate: [AuthenticationGuard] },
  { path: 'activityCategory', component: ActivityCategorysComponent, canActivate: [AuthenticationGuard] },
  { path: 'finance', loadChildren: '../../projects/finance/src/app/app.module#FinanceSharedModule' , canActivate: [AuthenticationGuard]},
  { path: 'sales', loadChildren: '../../projects/sales/src/app/app.module#SalesSharedModule' },
  { path: 'humanResources', loadChildren: '../../projects/human-resources/src/app/app.module#HumanResourcesSharedModule' },
  { path: 'projectManagement', loadChildren: '../../projects/project-management/src/app/app.module#ProjectManagementSharedModule' },
  { path: 'materialsManagement', loadChildren:'../../projects/materials-management/src/app/app.module#MaterialsManagementSharedModule'}
 ]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    FinanceSharedModule.forRoot()
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
