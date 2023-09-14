import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActivityEffects } from './store/effects/activity.effects';
import { ProfileComponent } from './profile.component';
import { EditActivityComponent } from './user-activity/edit-activity/edit-activity.component';
import { ActivityCategorysComponent } from './user-activity/activity-categorys/activity-categorys.component';
import { EditCategoryComponent } from './user-activity/edit-category/edit-category.component';
import { CreateCategoryComponent } from './user-activity/create-category/create-category.component';
import { ProfileSidenavComponent } from './profile-sidenav/profile-sidenav.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BioComponent } from './bio/bio.component';
import { PasswordSecComponent } from './password-sec/password-sec.component';
import { CreateActivityComponent } from './user-activity/create-activity/create-activity.component';
import { TodoComponent } from '../profile/user-activity/todo/todo.component';
import { SharedModule } from '@app/shared/shared.module';
import { ActivityCategoryEffects } from './store/effects/activity-category.effects';
import * as fromActivityReducer from './store/reducers/acivity.reducer';
import * as fromActivityCategoryReducer from './store/reducers/activity-category.reducer';

@NgModule({
  declarations: [
    ProfileComponent,
    EditActivityComponent,
    ActivityCategorysComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    AccountSettingsComponent,
    BioComponent,
    PasswordSecComponent,
    CreateActivityComponent,
    ProfileSidenavComponent,
    TodoComponent,
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,

    StoreModule.forFeature('profileModule', {
      activity: fromActivityReducer.activityReducer,
      activityCategory: fromActivityCategoryReducer.activityCategoryReducer,
    }),
    EffectsModule.forFeature([ActivityEffects, ActivityCategoryEffects]),
  ],
})
export class ProfileModule {}
