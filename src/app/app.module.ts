import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  Features Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
//  Services . directives and other helpers
import { JwtModule } from '@auth0/angular-jwt';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from './_helpers/services/users.service';
import { AuthenticationService } from './_helpers/services/authentication.service';
import { NavigationServiceService } from './_helpers/services/navigation-service.service';
import { RestDataSource } from './shared/data/rest.datasource';
import { DowndownDirective } from './shared/directives/dropdown.directive';
import { JwtInterceptor } from './_helpers/interceptors/jwt.interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { IsoDatePipe } from './_helpers/pipes/iso-date.pipe';
import { NumberRangesService } from './shared/data/number-ranges.service';
import { FinanceService } from './_helpers/services/finance.service';
import { ErrorService } from './_helpers/services/error.service';

// App Module Components
import { AppComponent } from './app.component';
import { SearchDialogComponent } from './features/finance/finance-dialogues/search-dialog/search-dialog.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { LoadingSpinnerComponent } from './shared/user-feedback-dialogues/loading-spinner/loading-spinner';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeSidenavComponent } from './home-page/home-sidenav/home-sidenav.component';
import { AgricultureDialogueComponent } from './home-page/home-page-dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { FinanceDialogueComponent } from './home-page/home-page-dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from './home-page/home-page-dialogues/hr-dialogue/hr-dialogue.component';
import { MaterialsDialogueComponent } from './home-page/home-page-dialogues/materials-dialogue/materials-dialogue.component';
import { ProjectsDialogueComponent } from './home-page/home-page-dialogues/projects-dialogue/projects-dialogue.component';
import { KnowledgeDialogueComponent } from './home-page/home-page-dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { SharedModule } from './shared/shared.module';

// StateManagement - NgRX

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DowndownDirective,
    IsoDatePipe,
    SearchDialogComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    HomePageComponent,
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
    BrowserAnimationsModule,
    MaterialModule,
    GoogleMapsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),

    SharedModule,

    // NgRX State Management

    StoreModule.forRoot({ router: routerReducer }),
    StoreDevtoolsModule.instrument({
      name: 'smallFarms',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(),
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
