import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { StoreModule } from '@ngrx/store';
import { activityReducer } from './store/reducers/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/effects/profile.effects';
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
import { BrowserModule } from '@angular/platform-browser';

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
    BrowserModule,
    ProfileRoutingModule,
    SharedModule,
    StoreModule.forFeature('activity', activityReducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class ProfileModule {}
