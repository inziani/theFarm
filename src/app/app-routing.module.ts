import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditActivityComponent } from "./shared/home/edit-activity/edit-activity.component";
import { HomeComponent } from "./shared/home/home.component";
import { LoginComponent } from "./core/authentication/login/login.component";
import { ProfileComponent } from "./shared/home/profile/profile.component";
import { SignupComponent } from "./core/authentication/signup/signup.component";
import { TodoComponent } from "./shared/home/todo/todo.component";
import { AuthenticationGuard } from "./_helpers/authentication.guard";


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'activity', component: TodoComponent },
  { path: 'newActivity', component: EditActivityComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class appRoutingModule{

}
