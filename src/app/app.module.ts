import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from './core/services/users.service';
import { AuthenticationService } from './core/services/authentication.service';
import { NavigationServiceService } from './core/services/navigation-service.service';
import { RestDataSource } from './core/shared/data/rest.datasource';
import { DowndownDirective } from './core/shared/directives/dropdown.directive';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { IsoDatePipe } from './_helpers/iso-date.pipe';
import { NumberRangesService } from './core/shared/data/number-ranges.service';
import { FinanceService } from './core/services/finance.service';
import { ErrorService } from './core/services/error.service';

import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './core/dialogues/delete-dialog/delete-dialog.component';
import { ErrorHandlingDialogComponent } from './core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { ObjectCreatedComponent } from './core/dialogues/object-created/object-created.component';
import { ChangesSavedDialogComponent } from './core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { SearchDialogComponent } from './features/finance/finance-dialogues/search-dialog/search-dialog.component';
import { TodoComponent } from './core/application-components/todo/todo.component';
// import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/application-components/profile/profile.component';
import { EditActivityComponent } from './core/application-components/edit-activity/edit-activity.component';
import { LoadingSpinnerComponent } from './core/application-components/loading-spinner/loading-spinner';
import { ActivityCategorysComponent } from './core/application-components/activity-categorys/activity-categorys.component';
import { FooterComponent } from './core/footer/footer.component';
import { ModulesComponent } from './core/modules/modules.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { LoginDialogComponent } from './core/dialogues/login-dialog/login-dialog.component';
import { EditCategoryComponent } from './core/application-components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './core/application-components/create-category/create-category.component';
import { DeleteCategoryDialogComponent } from './core/dialogues/delete-category-dialog/delete-category-dialog.component';
import { AccountSettingsComponent } from './core/application-components/profile/account-settings/account-settings.component';
import { BioComponent } from './core/application-components/profile/bio/bio.component';
import { RoleAuthComponent } from './core/application-components/profile/role-auth/role-auth.component';
import { PasswordSecComponent } from './core/application-components/profile/password-sec/password-sec.component';
import { CreateActivityComponent } from './core/application-components/create-activity/create-activity.component';
import { DeleteActivityDialogComponent } from './core/dialogues/delete-activity-dialog/delete-activity-dialog.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { ProfileSidenavComponent } from './core/application-components/profile/profile-sidenav/profile-sidenav.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
// import { HomeSidenavComponent } from './core/home-sidenav/home-sidenav.component';
import { AgricultureDialogueComponent } from './core/dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { FinanceDialogueComponent } from './core/dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from './core/dialogues/hr-dialogue/hr-dialogue.component';
import { MaterialsDialogueComponent } from './core/dialogues/materials-dialogue/materials-dialogue.component';
import { ProjectsDialogueComponent } from './core/dialogues/projects-dialogue/projects-dialogue.component';
import { KnowledgeDialogueComponent } from './core/dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { UserUpdateDialogComponent } from './core/dialogues/user-update-dialog/user-update-dialog.component';
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
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './store';
import { environment } from '@environments/environment';
import { InitialState } from '@ngrx/store/src/models';
import { uiReducer } from './store/reducers/ui.reducer';

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
    // HeaderComponent,
    ProfileComponent,
    EditActivityComponent,
    LoadingSpinnerComponent,
    ActivityCategorysComponent,
    FooterComponent,
    ModulesComponent,
    HomePageComponent,
    LoginDialogComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    DeleteCategoryDialogComponent,
    AccountSettingsComponent,
    BioComponent,
    RoleAuthComponent,
    PasswordSecComponent,
    CreateActivityComponent,
    DeleteActivityDialogComponent,
    AppLayoutComponent,
    AuthenticationLayoutComponent,
    ProfileSidenavComponent,
    ProfileLayoutComponent,
    // HomeSidenavComponent,
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
    // FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    // FlexLayoutModule,
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

    // StoreModule.forRoot(reducers as any, { metaReducers }),
    StoreModule.forRoot({ ui: uiReducer }),
    StoreModule.forFeature('ui', reducers),
    EffectsModule.forRoot(),
    storeDevTools,
    StoreRouterConnectingModule.forRoot(),
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
