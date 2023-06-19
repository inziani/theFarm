import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
// import { authenticationGuard } from '@app/_helpers/authentication.guard';
import { TodoComponent } from './todo/todo.component';
import { EditActivityComponent } from './todo/edit-activity/edit-activity.component';
import { ActivityCategorysComponent } from './todo/activity-categorys/activity-categorys.component';
import { BioComponent } from './bio/bio.component';
import { PasswordSecComponent } from './password-sec/password-sec.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    // canActivate: [authenticationGuard],
    // children: [
  },
  {
    path: 'activity',
    component: TodoComponent,
    // canActivate: [authenticationGuard],
  },
  {
    path: 'newActivity',
    component: EditActivityComponent,
    // canActivate: [authenticationGuard],
  },
  {
    path: 'activityCategory',
    component: ActivityCategorysComponent,
    // canActivate: [authenticationGuard],
  },
  {
    path: 'bio',
    component: BioComponent,
    // canActivate: [authenticationGuard],
  },
  {
    path: 'security',
    component: PasswordSecComponent,
    // canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
