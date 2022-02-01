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
// import { CreateGlaccountComponent } from "./finance/general-ledger/master-data/create-glaccount/create-glaccount.component";
// import { HomepageFinanceComponent } from "./finance/home-page/homepage-finance/homepage-finance.component";
// import { GenerelledgerHomepageComponent } from "./finance/general-ledger/generelledger-homepage/generelledger-homepage.component";


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'activity', component: TodoComponent, canActivate: [AuthenticationGuard] },
  { path: 'newActivity', component: EditActivityComponent, canActivate: [AuthenticationGuard] },
  { path: 'activityCategory', component: ActivityCategorysComponent, canActivate: [AuthenticationGuard] }
 ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class appRoutingModule {

}
