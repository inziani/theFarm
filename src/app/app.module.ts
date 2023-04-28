import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { JwtModule } from '@auth0/angular-jwt';



import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { UsersService } from './core/services/users.service';
import { AuthenticationService } from './core/services/authentication.service';
import { NavigationServiceService } from './core/services/navigation-service.service';
import { RestDataSource } from './core/shared/data/rest.datasource';
import { DowndownDirective } from './core/shared/directives/dropdown.directive';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { GoogleMapsModule } from '@angular/google-maps';
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
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
import { SearchDialogComponent } from './finance/finance-dialogues/search-dialog/search-dialog.component';

import { TodoComponent } from './core/application-components/todo/todo.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/application-components/profile/profile.component';
import { EditActivityComponent } from './core/application-components/edit-activity/edit-activity.component';
import { LoadingSpinnerComponent } from './core/application-components/loading-spinner/loading-spinner';
import { ActivityCategorysComponent } from './core/application-components/activity-categorys/activity-categorys.component';
import { FooterComponent } from './core/footer/footer.component';
import { SideNavComponent } from './core/side-nav/side-nav.component';
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
// import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';
import { CreateActivityComponent } from './core/application-components/create-activity/create-activity.component';
import { DeleteActivityDialogComponent } from './core/dialogues/delete-activity-dialog/delete-activity-dialog.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { ProfileSidenavComponent } from './core/application-components/profile/profile-sidenav/profile-sidenav.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { HomeSidenavComponent } from './core/home-sidenav/home-sidenav.component';
import { AgricultureDialogueComponent } from './core/dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { FinanceDialogueComponent } from './core/dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from './core/dialogues/hr-dialogue/hr-dialogue.component';
import { MaterialsDialogueComponent } from './core/dialogues/materials-dialogue/materials-dialogue.component';
import { ProjectsDialogueComponent } from './core/dialogues/projects-dialogue/projects-dialogue.component';
import { KnowledgeDialogueComponent } from './core/dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { UserUpdateDialogComponent } from './core/dialogues/user-update-dialog/user-update-dialog.component';

// Finance components
// import { FinanceFooterComponent } from './finance/finance-footer/finance-footer.component';
// import { FinanceHomeComponent } from './finance/finance-home/finance-home.component';
// import { FinanceLayoutComponent } from './finance/finance-layout/finance-layout.component';
// import { FinanceNavbarComponent } from './finance/finance-navbar/finance-navbar.component';
// import { FinanceSidenavComponent } from './finance/finance-sidenav/finance-sidenav.component';
// import { GlMasterDataComponent } from './finance/general-ledger/gl-master-data/gl-master-data.component';
// import { CompanyDialogComponent } from './finance/finance-dialogues/company-dialog/company-dialog.component';
// import { ChartOfAccountsDialogComponent } from './finance/finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
// import { ReportingAreaDialogComponent } from './finance/finance-dialogues/reporting-area-dialog/reporting-area-dialog.component';
// import { ControllingAreaDialogComponent } from './finance/finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
// import { BusinessAreaDialogComponent } from './finance/finance-dialogues/business-area-dialog/business-area-dialog.component';
// import { DeleteCompanyDialogComponent } from './finance/finance-dialogues/delete-company-dialog/delete-company-dialog.component';
// import { CreateCompanyDialogComponent } from './finance/finance-dialogues/create-company-dialog/create-company-dialog.component';
// import { DisplayCompanyDialogComponent } from './finance/finance-dialogues/display-company-dialog/display-company-dialog.component';
// import { OrgUnitListComponent } from './finance/org-unit-list/org-unit-list.component';
// import { OrgDetailsCompanyComponent } from './finance/org-details-company/org-details-company.component';
// import { OrgDetailsCompanyCodeComponent } from './finance/org-details-company-code/org-details-company-code.component';
// import { OrgDetailsChartofaccountsComponent } from './finance/org-details-chartofaccounts/org-details-chartofaccounts.component';
// import { OrgDetailsControllingareaComponent } from './finance/org-details-controllingarea/org-details-controllingarea.component';
// import { OrgDetailsBusinessareaComponent } from './finance/org-details-businessarea/org-details-businessarea.component';
// import { OrgDetailsSalesareaComponent } from './finance/org-details-salesarea/org-details-salesarea.component';
// import { OrgDetailsReportingareaComponent } from './finance/org-details-reportingarea/org-details-reportingarea.component';
// import { CreateCompanyCodeDialogComponent } from './finance/finance-dialogues/create-company-code-dialog/create-company-code-dialog.component';
// import { DisplayCompanyCodeDialogComponent } from './finance/finance-dialogues/display-company-code-dialog/display-company-code-dialog.component';
// import { EditCompanyCodeDialogComponent } from './finance/finance-dialogues/edit-company-code-dialog/edit-company-code-dialog.component';
// import { DeleteCompanyCodeDialogComponent } from './finance/finance-dialogues/delete-company-code-dialog/delete-company-code-dialog.component';
// import { GlTransactionCodesComponent } from './finance/general-ledger/gl-transaction-codes/gl-transaction-codes.component';
// import { TransCodeListComponent } from './finance/general-ledger/trans-code-list/trans-code-list.component';
// import { AccountGroupDetailsComponent } from './finance/general-ledger/account-group-details/account-group-details.component';
// import { TaxCodeDetailsComponent } from './finance/general-ledger/tax-code-details/tax-code-details.component';
// import { FinanceLandingPageComponent } from './finance/finance-home/finance-landing-page/finance-landing-page.component';
// import { AccountGroupDialogComponent } from './finance/general-ledger/gl-dialogues/account-group-dialog/account-group-dialog.component';
// import { TaxCodeDialogComponent } from './finance/general-ledger/gl-dialogues/tax-code-dialog/tax-code-dialog.component';

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
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ProfileComponent,
    EditActivityComponent,
    LoadingSpinnerComponent,
    ActivityCategorysComponent,
    FooterComponent,
    SideNavComponent,
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
    HomeSidenavComponent,
    AgricultureDialogueComponent,
    FinanceDialogueComponent,
    HrDialogueComponent,
    MaterialsDialogueComponent,
    ProjectsDialogueComponent,
    KnowledgeDialogueComponent,

    // FinanceHomeComponent,
    // FinanceLayoutComponent,
    // FinanceNavbarComponent,
    // FinanceSidenavComponent,
    // GlMasterDataComponent,
    // FinanceFooterComponent,
    // CompanyDialogComponent,
    // ChartOfAccountsDialogComponent,
    // ReportingAreaDialogComponent,
    // ControllingAreaDialogComponent,
    // BusinessAreaDialogComponent,
    // DeleteCompanyDialogComponent,
    // CreateCompanyDialogComponent,
    // DisplayCompanyDialogComponent,
    // OrgUnitListComponent,
    // OrgDetailsCompanyComponent,
    // OrgDetailsCompanyCodeComponent,
    // OrgDetailsChartofaccountsComponent,
    // OrgDetailsControllingareaComponent,
    // OrgDetailsBusinessareaComponent,
    // OrgDetailsSalesareaComponent,
    // OrgDetailsReportingareaComponent,
    // CreateCompanyCodeDialogComponent,
    // DisplayCompanyCodeDialogComponent,
    // EditCompanyCodeDialogComponent,
    // DeleteCompanyCodeDialogComponent,
    // GlTransactionCodesComponent,
    // TransCodeListComponent,
    // AccountGroupDetailsComponent,
    // TaxCodeDetailsComponent,
    // FinanceLandingPageComponent,
    // AccountGroupDialogComponent,
    // TaxCodeDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    GoogleMapsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
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
