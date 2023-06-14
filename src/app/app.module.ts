import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from './_helpers/services/users.service';
import { AuthenticationService } from './_helpers/services/authentication.service';
import { NavigationServiceService } from './_helpers/services/navigation-service.service';
import { RestDataSource } from './shared/data/rest.datasource';
import { DowndownDirective } from './shared/directives/dropdown.directive';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { IsoDatePipe } from './_helpers/iso-date.pipe';
import { NumberRangesService } from './shared/data/number-ranges.service';
import { FinanceService } from './_helpers/services/finance.service';
import { ErrorService } from './_helpers/services/error.service';

import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './shared/user-feedback-dialogues/delete-dialog/delete-dialog.component';
import { ErrorHandlingDialogComponent } from './shared/user-feedback-dialogues/error-handling-dialog/error-handling-dialog.component';
import { ObjectCreatedComponent } from './shared/user-feedback-dialogues/object-created/object-created.component';
import { ChangesSavedDialogComponent } from './shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { SearchDialogComponent } from './features/finance/finance-dialogues/search-dialog/search-dialog.component';
import { TodoComponent } from './profile/todo/todo.component';
import { HeaderComponent } from './home-page/header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { EditActivityComponent } from './profile/todo/edit-activity/edit-activity.component';
import { LoadingSpinnerComponent } from './shared/user-feedback-dialogues/loading-spinner/loading-spinner';
import { ActivityCategorysComponent } from './profile/todo/activity-categorys/activity-categorys.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginDialogComponent } from './shared/user-feedback-dialogues/login-dialog/login-dialog.component';
import { EditCategoryComponent } from './profile/todo/edit-category/edit-category.component';
import { CreateCategoryComponent } from './profile/todo/create-category/create-category.component';
import { DeleteCategoryDialogComponent } from './shared/user-feedback-dialogues/delete-category-dialog/delete-category-dialog.component';
import { AccountSettingsComponent } from './profile/account-settings/account-settings.component';
import { BioComponent } from './profile/bio/bio.component';
import { PasswordSecComponent } from './profile/password-sec/password-sec.component';
import { CreateActivityComponent } from './profile/todo/create-activity/create-activity.component';
import { DeleteActivityDialogComponent } from './shared/user-feedback-dialogues/delete-activity-dialog/delete-activity-dialog.component';
import { ProfileSidenavComponent } from './profile/profile-sidenav/profile-sidenav.component';
import { HomeSidenavComponent } from './home-page/home-sidenav/home-sidenav.component';
import { AgricultureDialogueComponent } from './home-page/home-page-dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { FinanceDialogueComponent } from './home-page/home-page-dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from './home-page/home-page-dialogues/hr-dialogue/hr-dialogue.component';
import { MaterialsDialogueComponent } from './home-page/home-page-dialogues/materials-dialogue/materials-dialogue.component';
import { ProjectsDialogueComponent } from './home-page/home-page-dialogues/projects-dialogue/projects-dialogue.component';
import { KnowledgeDialogueComponent } from './home-page/home-page-dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { UserUpdateDialogComponent } from './shared/user-update-dialog/user-update-dialog.component';
import { SalesModule } from './features/sales/sales.module';
import { FinanceLayoutModule } from './features/finance/finance-layout/finance-layout.module';
import { SharedModule } from './shared/shared.module';

// StateManagement - NgRX

import {
  StoreModule,
  MetaReducer,
  Action,
  ActionReducerFactory,
} from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '@environments/environment';
import { InitialState } from '@ngrx/store/src/models';
import { uiReducer } from './store/reducers/ui.reducer';
import { EffectsModule } from '@ngrx/effects';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const storeDevTools: ModuleWithProviders<any>[] = !environment.production
  ? [StoreDevtoolsModule.instrument()]
  : [];

export declare type StoreConfig<T, V extends Action = Action> = {
  initialState?: InitialState<T>;
  reducerFactory?: ActionReducerFactory<T, V>;
  metaReducers?: MetaReducer<T, V>[];
};

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DowndownDirective,
    DeleteDialogComponent,
    ErrorHandlingDialogComponent,
    ObjectCreatedComponent,
    IsoDatePipe,
    ChangesSavedDialogComponent,
    SearchDialogComponent,
    UserUpdateDialogComponent,
    HomePageComponent,
    TodoComponent,
    HeaderComponent,
    ProfileComponent,
    EditActivityComponent,
    LoadingSpinnerComponent,
    ActivityCategorysComponent,
    FooterComponent,
    HomePageComponent,
    LoginDialogComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    DeleteCategoryDialogComponent,
    AccountSettingsComponent,
    BioComponent,
    PasswordSecComponent,
    CreateActivityComponent,
    DeleteActivityDialogComponent,
    ProfileSidenavComponent,
    HomeSidenavComponent,
    AgricultureDialogueComponent,
    FinanceDialogueComponent,
    HrDialogueComponent,
    MaterialsDialogueComponent,
    ProjectsDialogueComponent,
    KnowledgeDialogueComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    GoogleMapsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    SalesModule,
    FinanceLayoutModule,
    SharedModule,

    // NgRX State Management

    StoreModule.forRoot({ ui: uiReducer }, {}),
    StoreDevtoolsModule.instrument({
      name: 'smallFarms',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  exports: [SharedModule],

  providers: [
    UsersService,
    AuthenticationService,
    RestDataSource,
    NavigationServiceService,
    DatePipe,
    FinanceService,
    IsoDatePipe,
    NumberRangesService,
    ErrorService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
