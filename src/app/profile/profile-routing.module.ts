import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { TodoComponent } from './user-activity/todo/todo.component';
import { ActivityCategorysComponent } from './user-activity/activity-categorys/activity-categorys.component';
import { PasswordSecComponent } from './password-sec/password-sec.component';
import { BioComponent } from './bio/bio.component';

const routes: Routes = [
  {
    path: 'activity',
    component: TodoComponent,
  },
  { path: 'activityCategory', component: ActivityCategorysComponent },
  { path: 'bio', component: BioComponent },
  { path: 'security', component: PasswordSecComponent },
  { path: '', component: ProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
