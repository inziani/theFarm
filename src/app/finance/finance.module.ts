import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../src/app/material.module';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceLayoutComponent } from './finance-layout/finance-layout.component';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { GlMasterDataComponent } from './general-ledger/gl-master-data/gl-master-data.component';
import { GlTransactionCodesComponent } from './general-ledger/gl-transaction-codes/gl-transaction-codes.component';
import { OrgDetailsCompanyComponent } from './org-details-company/org-details-company.component';
import { OrgDetailsCompanyCodeComponent } from './org-details-company-code/org-details-company-code.component';
import { OrgDetailsChartofaccountsComponent } from './org-details-chartofaccounts/org-details-chartofaccounts.component';
import { OrgDetailsControllingareaComponent } from './org-details-controllingarea/org-details-controllingarea.component';
import { OrgDetailsBusinessareaComponent } from './org-details-businessarea/org-details-businessarea.component';
import { OrgDetailsSalesareaComponent } from './org-details-salesarea/org-details-salesarea.component';
import { OrgDetailsReportingareaComponent } from './org-details-reportingarea/org-details-reportingarea.component';
import { OrgUnitListComponent } from './org-unit-list/org-unit-list.component';
import { FinanceFooterComponent } from './finance-footer/finance-footer.component';

import { TransCodeListComponent } from './general-ledger/trans-code-list/trans-code-list.component';
import { AccountGroupDetailsComponent } from './general-ledger/account-group-details/account-group-details.component';
import { TaxCodeDetailsComponent } from './general-ledger/tax-code-details/tax-code-details.component';
import { FinanceLandingPageComponent } from './finance-home/finance-landing-page/finance-landing-page.component';
import { AccountGroupDialogComponent } from './general-ledger/gl-dialogues/account-group-dialog/account-group-dialog.component';
import { TaxCodeDialogComponent } from './general-ledger/gl-dialogues/tax-code-dialog/tax-code-dialog.component';
import { FinanceNavbarComponent } from './finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from './finance-sidenav/finance-sidenav.component';
import { CompanyDialogComponent } from './finance-dialogues/company-dialog/company-dialog.component';
import { ChartOfAccountsDialogComponent } from './finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { ReportingAreaDialogComponent } from './finance-dialogues/reporting-area-dialog/reporting-area-dialog.component';
import { ControllingAreaDialogComponent } from './finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { BusinessAreaDialogComponent } from './finance-dialogues/business-area-dialog/business-area-dialog.component';
import { DeleteCompanyDialogComponent } from './finance-dialogues/delete-company-dialog/delete-company-dialog.component';
import { CreateCompanyDialogComponent } from './finance-dialogues/create-company-dialog/create-company-dialog.component';
import { DisplayCompanyDialogComponent } from './finance-dialogues/display-company-dialog/display-company-dialog.component';
import { CreateCompanyCodeDialogComponent } from './finance-dialogues/create-company-code-dialog/create-company-code-dialog.component';
import { DisplayCompanyCodeDialogComponent } from './finance-dialogues/display-company-code-dialog/display-company-code-dialog.component';
import { EditCompanyCodeDialogComponent } from './finance-dialogues/edit-company-code-dialog/edit-company-code-dialog.component';
import { DeleteCompanyCodeDialogComponent } from './finance-dialogues/delete-company-code-dialog/delete-company-code-dialog.component';

@NgModule({
  declarations: [
    FinanceLayoutComponent,
    FinanceHomeComponent,
    GlMasterDataComponent,
    GlTransactionCodesComponent,
    OrgUnitListComponent,
    OrgDetailsCompanyComponent,
    OrgDetailsCompanyCodeComponent,
    OrgDetailsChartofaccountsComponent,
    OrgDetailsControllingareaComponent,
    OrgDetailsBusinessareaComponent,
    OrgDetailsSalesareaComponent,
    OrgDetailsReportingareaComponent,
    FinanceFooterComponent,
    TransCodeListComponent,
    AccountGroupDetailsComponent,
    TaxCodeDetailsComponent,
    FinanceLandingPageComponent,
    AccountGroupDialogComponent,
    TaxCodeDialogComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    CompanyDialogComponent,
    ChartOfAccountsDialogComponent,
    ReportingAreaDialogComponent,
    ControllingAreaDialogComponent,
    BusinessAreaDialogComponent,
    DeleteCompanyDialogComponent,
    CreateCompanyDialogComponent,
    DisplayCompanyDialogComponent,
    CreateCompanyCodeDialogComponent,
    DisplayCompanyCodeDialogComponent,
    EditCompanyCodeDialogComponent,
    DeleteCompanyCodeDialogComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinanceRoutingModule,
    MaterialModule,
  ],
})
export class FinanceModule {}
