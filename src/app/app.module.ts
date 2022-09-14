import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { UsersService } from './core/services/users.service';
import { AuthenticationService } from './core/services/authentication.service';
import { NavigationServiceService } from './core/services/navigation-service.service';
import { RestDataSource } from './core/shared/data/rest.datasource';
import { DowndownDirective } from './core/shared/directives/dropdown.directive';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { GoogleMapsModule } from '@angular/google-maps'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faEdit, faTrash, faPlus, faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app.component';
import { TodoComponent } from './core/application-components/todo/todo.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/application-components/profile/profile.component';
import { EditActivityComponent } from './core/application-components/edit-activity/edit-activity.component';
import { LoadingSpinnerComponent } from './core/application-components/loading-spinner/loading-spinner';
import { ActivityCategorysComponent } from './core/application-components/activity-categorys/activity-categorys.component';
import { FooterComponent } from './core/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { ModulesComponent } from './core/modules/modules.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LoginDialogComponent } from './core/dialogues/login-dialog/login-dialog.component';
import { EditCategoryComponent } from './core/application-components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './core/application-components/create-category/create-category.component';
import { DeleteCategoryDialogComponent } from './core/dialogues/delete-category-dialog/delete-category-dialog.component';
import { AccountSettingsComponent } from './core/application-components/profile/account-settings/account-settings.component';
import { BioComponent } from './core/application-components/profile/bio/bio.component';
import { RoleAuthComponent } from './core/application-components/profile/role-auth/role-auth.component';
import { PasswordSecComponent } from './core/application-components/profile/password-sec/password-sec.component';
import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';
import { DatePipe } from '@angular/common';
import { CreateActivityComponent } from './core/application-components/create-activity/create-activity.component';
import { ChangesSavedDialogComponent } from './core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteActivityDialogComponent } from './core/dialogues/delete-activity-dialog/delete-activity-dialog.component';

// Finance components
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { FinanceHomeComponent } from './finance/finance-home/finance-home.component';
import { FinanceLayoutComponent } from './finance/finance-layout/finance-layout.component';
import { FinanceNavbarComponent } from './finance/finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from './finance/finance-sidenav/finance-sidenav.component';
import { GlMasterDataComponent } from './finance/general-ledger/gl-master-data/gl-master-data.component';
import { ProfileSidenavComponent } from './core/application-components/profile/profile-sidenav/profile-sidenav.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { HomeSidenavComponent } from './core/home-sidenav/home-sidenav.component';
import { AgricultureDialogueComponent } from './core/dialogues/agriculture-dialogue/agriculture-dialogue.component';
import { FinanceDialogueComponent } from './core/dialogues/finance-dialogue/finance-dialogue.component';
import { HrDialogueComponent } from './core/dialogues/hr-dialogue/hr-dialogue.component';
import { MaterialsDialogueComponent } from './core/dialogues/materials-dialogue/materials-dialogue.component';
import { ProjectsDialogueComponent } from './core/dialogues/projects-dialogue/projects-dialogue.component';
import { KnowledgeDialogueComponent } from './core/dialogues/knowledge-dialogue/knowledge-dialogue.component';
import { FinanceFooterComponent } from './finance/finance-footer/finance-footer.component';
import { SearchDialogComponent } from './finance/finance-dialogues/search-dialog/search-dialog.component';
import { CompanyDialogComponent } from './finance/finance-dialogues/company-dialog/company-dialog.component';
import { FinanceService } from './core/services/finance.service';
import { CompanyCodeDialogComponent } from './finance/finance-dialogues/company-code-dialog/company-code-dialog.component';
import { ChartOfAccountsDialogComponent } from './finance/finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { ReportingAreaDialogComponent } from './finance/finance-dialogues/reporting-area-dialog/reporting-area-dialog.component';
import { ControllingAreaDialogComponent } from './finance/finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { BusinessAreaDialogComponent } from './finance/finance-dialogues/business-area-dialog/business-area-dialog.component';
import { OrgUnitDetailsComponent } from './finance/org-unit-details/org-unit-details.component';
import { DeleteCompanyDialogComponent } from './finance/finance-dialogues/delete-company-dialog/delete-company-dialog.component';
import { CreateCompanyDialogComponent } from './finance/finance-dialogues/create-company-dialog/create-company-dialog.component';
import { DisplayCompanyDialogComponent } from './finance/finance-dialogues/display-company-dialog/display-company-dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        TodoComponent,
        LoginComponent,
        SignupComponent,
        HeaderComponent,
        ProfileComponent,
        EditActivityComponent,
        DowndownDirective,
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
        ChangesSavedDialogComponent,
        DeleteActivityDialogComponent,
        AppLayoutComponent,
        AuthenticationLayoutComponent,
        FinanceHomeComponent,
        FinanceLayoutComponent,
        FinanceNavbarComponent,
        FinanceSidenavComponent,
        GlMasterDataComponent,
        ProfileSidenavComponent,
        ProfileLayoutComponent,
        HomeSidenavComponent,
        AgricultureDialogueComponent,
        FinanceDialogueComponent,
        HrDialogueComponent,
        MaterialsDialogueComponent,
        ProjectsDialogueComponent,
        KnowledgeDialogueComponent,
        FinanceFooterComponent,
        SearchDialogComponent,
        CompanyDialogComponent,
        CompanyCodeDialogComponent,
        ChartOfAccountsDialogComponent,
        ReportingAreaDialogComponent,
        ControllingAreaDialogComponent,
        BusinessAreaDialogComponent,
        OrgUnitDetailsComponent,
        DeleteCompanyDialogComponent,
        CreateCompanyDialogComponent,
        DisplayCompanyDialogComponent,

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
    ],
    providers: [
        UsersService, AuthenticationService,
        RestDataSource, NavigationServiceService, DatePipe, FinanceService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        { provide: MAT_DIALOG_DATA, useValue: {}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    // myLibrary.addIcons(faSquare, faEdit, faTrash, faPlus, faHome, faTwitter, faLinkedin, faTelegram, faBars, faWhatsapp);
  }
}
