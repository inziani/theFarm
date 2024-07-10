import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FinanceNavbarComponent } from '@app/features/finance-layout/finance-Folder/finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from '@app/features/finance-layout/finance-Folder/finance-sidenav/finance-sidenav.component';
import { MaterialModule } from '@app/material.module';
import { UnauthorizedServeResponseComponent } from './user-feedback-dialogues/unauthorized-serve-response/unauthorized-serve-response.component';
import { SideNavComponent } from '@app/home-page/side-nav/side-nav.component';
import { DeleteActivityDialogComponent } from '../profile/user-activity/delete-activity-dialog/delete-activity-dialog.component';
import { DeleteCategoryDialogComponent } from '../profile/user-activity/delete-category-dialog/delete-category-dialog.component';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
import { DeleteDialogComponent } from './user-feedback-dialogues/delete-dialog/delete-dialog.component';
import { ObjectCreatedComponent } from './user-feedback-dialogues/object-created/object-created.component';
import { ChangesSavedDialogComponent } from './user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { LoginDialogComponent } from './user-feedback-dialogues/login-dialog/login-dialog.component';
import { HeaderComponent } from '../home-page/header/header.component';

import { GeneralLedgerSidebarComponent } from '@app/features/finance-layout/general-ledger/general-ledger-sidebar/general-ledger-sidebar.component';
import { FinanceHomeComponent } from '../features/finance-layout/finance-Folder/finance-home/finance-home.component';
import { GeneralLedgerReportsComponent } from '../features/finance-layout/general-ledger/general-ledger-reports/general-ledger-reports.component';
import { MasterDataReportComponent } from '../features/finance-layout/general-ledger/general-ledger-reports/master-data-report/master-data-report.component';
import { GlLineItemsComponent } from '../features/finance-layout/general-ledger/general-ledger-reports/gl-line-items/gl-line-items.component';
import { TrialBalanceComponent } from '../features/finance-layout/general-ledger/general-ledger-reports/trial-balance/trial-balance.component';
import { GlMasterDataComponent } from '../features/finance-layout/general-ledger/gl-master-data/gl-master-data.component';
import { GlTransactionCodesComponent } from '../features/finance-layout/general-ledger/gl-transaction-codes/gl-transaction-codes.component';
import { TransCodeListComponent } from '../features/finance-layout/general-ledger/trans-code-list/trans-code-list.component';
import { AccountGroupDetailsComponent } from '../features/finance-layout/general-ledger/account-group-details/account-group-details.component';
import { TaxCodeDetailsComponent } from '../features/finance-layout/general-ledger/tax-code-details/tax-code-details.component';
import { OrgUnitListComponent } from '../features/finance-layout/finance-Folder/org-unit-list/org-unit-list.component';
import { OrgDetailsCompanyComponent } from '../features/finance-layout/finance-Folder/org-details-company/org-details-company.component';
import { OrgDetailsCompanyCodeComponent } from '../features/finance-layout/finance-Folder/org-details-company-code/org-details-company-code.component';
import { OrgDetailsChartofaccountsComponent } from '../features/finance-layout/finance-Folder/org-details-chartofaccounts/org-details-chartofaccounts.component';
import { OrgDetailsControllingareaComponent } from '../features/finance-layout/finance-Folder/org-details-controllingarea/org-details-controllingarea.component';
import { OrgDetailsBusinessareaComponent } from '../features/finance-layout/finance-Folder/org-details-businessarea/org-details-businessarea.component';
import { OrgDetailsSalesareaComponent } from '../features/finance-layout/finance-Folder/org-details-salesarea/org-details-salesarea.component';
import { OrgDetailsReportingareaComponent } from '../features/finance-layout/finance-Folder/org-details-reportingarea/org-details-reportingarea.component';

@NgModule({
  declarations: [
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,
    SideNavComponent,
    DeleteActivityDialogComponent,
    DeleteCategoryDialogComponent,
    UserUpdateDialogComponent,
    DeleteDialogComponent,
    ObjectCreatedComponent,
    ChangesSavedDialogComponent,
    LoginDialogComponent,
    HeaderComponent,
    GeneralLedgerSidebarComponent,
    FinanceHomeComponent,
    GeneralLedgerReportsComponent,
    MasterDataReportComponent,
    GlLineItemsComponent,
    TrialBalanceComponent,
    GlMasterDataComponent,
    GlTransactionCodesComponent,
    TransCodeListComponent,
    AccountGroupDetailsComponent,
    TaxCodeDetailsComponent,
    OrgUnitListComponent,
    OrgDetailsCompanyComponent,
    OrgDetailsCompanyCodeComponent,
    OrgDetailsChartofaccountsComponent,
    OrgDetailsControllingareaComponent,
    OrgDetailsBusinessareaComponent,
    OrgDetailsSalesareaComponent,
    OrgDetailsReportingareaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,
    SideNavComponent,
    DeleteActivityDialogComponent,
    DeleteCategoryDialogComponent,
    UserUpdateDialogComponent,
    DeleteDialogComponent,
    ObjectCreatedComponent,
    ChangesSavedDialogComponent,
    LoginDialogComponent,
    HeaderComponent,
    MaterialModule,
    GeneralLedgerSidebarComponent,
    FinanceHomeComponent,
    GeneralLedgerReportsComponent,
    MasterDataReportComponent,
    GlLineItemsComponent,
    TrialBalanceComponent,
    GlMasterDataComponent,
    GlTransactionCodesComponent,
    TransCodeListComponent,
    AccountGroupDetailsComponent,
    TaxCodeDetailsComponent,
    OrgUnitListComponent,
    OrgDetailsCompanyComponent,
    OrgDetailsCompanyCodeComponent,
    OrgDetailsChartofaccountsComponent,
    OrgDetailsControllingareaComponent,
    OrgDetailsBusinessareaComponent,
    OrgDetailsSalesareaComponent,
    OrgDetailsReportingareaComponent,
  ],
})
export class SharedModule {}
