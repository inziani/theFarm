import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditActivityComponent } from "./home/edit-activity/edit-activity.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./home/login/login.component";
import { ProfileComponent } from "./home/profile/profile.component";
import { SignupComponent } from "./home/signup/signup.component";
import { TodoComponent } from "./home/todo/todo.component";


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'activitys', component: TodoComponent },
  { path: 'newActivity', component: EditActivityComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class appRoutingModule{

}
