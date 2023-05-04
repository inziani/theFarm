import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceLayoutRoutingModule } from './finance-layout-routing.module';
import { FinanceLayoutComponent } from './finance-layout.component';
// Finance components
import { FinanceFooterComponent } from '../../finance/finance-footer/finance-footer.component';
import { FinanceHomeComponent } from '../../finance/finance-home/finance-home.component';
// import { FinanceNavbarComponent } from '../../finance/finance-navbar/finance-navbar.component';
// import { FinanceSidenavComponent } from '../../finance/finance-sidenav/finance-sidenav.component';
import { GlMasterDataComponent } from '../../finance/general-ledger/gl-master-data/gl-master-data.component';
import { CompanyDialogComponent } from '../../finance/finance-dialogues/company-dialog/company-dialog.component';
import { ChartOfAccountsDialogComponent } from '../../finance/finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { ReportingAreaDialogComponent } from '../../finance/finance-dialogues/reporting-area-dialog/reporting-area-dialog.component';
import { ControllingAreaDialogComponent } from '../../finance/finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { BusinessAreaDialogComponent } from '../../finance/finance-dialogues/business-area-dialog/business-area-dialog.component';
import { DeleteCompanyDialogComponent } from '../../finance/finance-dialogues/delete-company-dialog/delete-company-dialog.component';
import { CreateCompanyDialogComponent } from '../../finance/finance-dialogues/create-company-dialog/create-company-dialog.component';
import { DisplayCompanyDialogComponent } from '../../finance/finance-dialogues/display-company-dialog/display-company-dialog.component';
import { OrgUnitListComponent } from '../../finance/org-unit-list/org-unit-list.component';
import { OrgDetailsCompanyComponent } from '../../finance/org-details-company/org-details-company.component';
import { OrgDetailsCompanyCodeComponent } from '../../finance/org-details-company-code/org-details-company-code.component';
import { OrgDetailsChartofaccountsComponent } from '../../finance/org-details-chartofaccounts/org-details-chartofaccounts.component';
import { OrgDetailsControllingareaComponent } from '../../finance/org-details-controllingarea/org-details-controllingarea.component';
import { OrgDetailsBusinessareaComponent } from '../../finance/org-details-businessarea/org-details-businessarea.component';
import { OrgDetailsSalesareaComponent } from '../../finance/org-details-salesarea/org-details-salesarea.component';
import { OrgDetailsReportingareaComponent } from '../../finance/org-details-reportingarea/org-details-reportingarea.component';
import { CreateCompanyCodeDialogComponent } from '../../finance/finance-dialogues/create-company-code-dialog/create-company-code-dialog.component';
import { DisplayCompanyCodeDialogComponent } from '../../finance/finance-dialogues/display-company-code-dialog/display-company-code-dialog.component';
import { EditCompanyCodeDialogComponent } from '../../finance/finance-dialogues/edit-company-code-dialog/edit-company-code-dialog.component';
import { DeleteCompanyCodeDialogComponent } from '../../finance/finance-dialogues/delete-company-code-dialog/delete-company-code-dialog.component';
import { GlTransactionCodesComponent } from '../../finance/general-ledger/gl-transaction-codes/gl-transaction-codes.component';
import { TransCodeListComponent } from '../../finance/general-ledger/trans-code-list/trans-code-list.component';
import { AccountGroupDetailsComponent } from '../../finance/general-ledger/account-group-details/account-group-details.component';
import { TaxCodeDetailsComponent } from '../../finance/general-ledger/tax-code-details/tax-code-details.component';
import { FinanceLandingPageComponent } from '../../finance/finance-home/finance-landing-page/finance-landing-page.component';
import { AccountGroupDialogComponent } from '../../finance/general-ledger/gl-dialogues/account-group-dialog/account-group-dialog.component';
import { TaxCodeDialogComponent } from '../../finance/general-ledger/gl-dialogues/tax-code-dialog/tax-code-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    FinanceLayoutComponent,
    FinanceHomeComponent,
    FinanceLayoutComponent,
    // FinanceNavbarComponent,
    // FinanceSidenavComponent,
    GlMasterDataComponent,
    FinanceFooterComponent,
    CompanyDialogComponent,
    ChartOfAccountsDialogComponent,
    ReportingAreaDialogComponent,
    ControllingAreaDialogComponent,
    BusinessAreaDialogComponent,
    DeleteCompanyDialogComponent,
    CreateCompanyDialogComponent,
    DisplayCompanyDialogComponent,
    OrgUnitListComponent,
    OrgDetailsCompanyComponent,
    OrgDetailsCompanyCodeComponent,
    OrgDetailsChartofaccountsComponent,
    OrgDetailsControllingareaComponent,
    OrgDetailsBusinessareaComponent,
    OrgDetailsSalesareaComponent,
    OrgDetailsReportingareaComponent,
    CreateCompanyCodeDialogComponent,
    DisplayCompanyCodeDialogComponent,
    EditCompanyCodeDialogComponent,
    DeleteCompanyCodeDialogComponent,
    GlTransactionCodesComponent,
    TransCodeListComponent,
    AccountGroupDetailsComponent,
    TaxCodeDetailsComponent,
    FinanceLandingPageComponent,
    AccountGroupDialogComponent,
    TaxCodeDialogComponent,
  ],
  imports: [
    CommonModule,
    FinanceLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
})
export class FinanceLayoutModule {}
