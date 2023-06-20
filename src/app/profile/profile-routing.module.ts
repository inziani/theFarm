import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { TodoComponent } from './todo/todo.component';
import { ActivityCategorysComponent } from './todo/activity-categorys/activity-categorys.component';
import { PasswordSecComponent } from './password-sec/password-sec.component';
import { BioComponent } from './bio/bio.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'activity', component: TodoComponent },
      { path: 'activityCategory', component: ActivityCategorysComponent },
      { path: 'bio', component: BioComponent },
      { path: 'security', component: PasswordSecComponent },
      { path: '', component: ProfileComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

// Note to self - Bio Component remains unsused

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
