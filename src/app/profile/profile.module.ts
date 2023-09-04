import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { StoreModule } from '@ngrx/store';
import { activityReducer } from './store/reducers/acivity.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActivityEffects } from './store/effects/activity.effects';
import { ProfileComponent } from './profile.component';
import { EditActivityComponent } from './todo/edit-activity/edit-activity.component';
import { ActivityCategorysComponent } from './todo/activity-categorys/activity-categorys.component';
import { EditCategoryComponent } from './todo/edit-category/edit-category.component';
import { CreateCategoryComponent } from './todo/create-category/create-category.component';
import { ProfileSidenavComponent } from './profile-sidenav/profile-sidenav.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BioComponent } from './bio/bio.component';
import { PasswordSecComponent } from './password-sec/password-sec.component';
import { CreateActivityComponent } from './todo/create-activity/create-activity.component';
import { TodoComponent } from './todo/todo.component';
import { SharedModule } from '@app/shared/shared.module';
import { ActivityCategoryEffects } from './store/effects/activity-category.effects';
import { profileReducer } from './store/reducers/profile-reducer';






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
    StoreModule.forFeature('profileModule', profileReducer),
    EffectsModule.forFeature([ActivityEffects, ActivityCategoryEffects]),
  ],
})
export class ProfileModule {}
