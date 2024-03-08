import { NgModule } from '@angular/core';

import { FinanceLayoutRoutingModule } from './finance-layout-routing.module';
import { FinanceLayoutComponent } from './finance-layout.component';
// Finance components
import { FinanceFooterComponent } from './finance-Folder/finance-footer/finance-footer.component';
import { FinanceHomeComponent } from './finance-Folder/finance-home/finance-home.component';
import { GlMasterDataComponent } from './finance-Folder/general-ledger/gl-master-data/gl-master-data.component';
import { CompanyDialogComponent } from './finance-Folder/finance-dialogues/company-dialog/company-dialog.component';
import { ChartOfAccountsDialogComponent } from './finance-Folder/finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { ReportingAreaDialogComponent } from './finance-Folder/finance-dialogues/reporting-area-dialog/reporting-area-dialog.component';
import { ControllingAreaDialogComponent } from './finance-Folder/finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { BusinessAreaDialogComponent } from './finance-Folder/finance-dialogues/business-area-dialog/business-area-dialog.component';
import { DeleteCompanyDialogComponent } from './finance-Folder/finance-dialogues/delete-company-dialog/delete-company-dialog.component';
import { CreateCompanyDialogComponent } from './finance-Folder/finance-dialogues/create-company-dialog/create-company-dialog.component';
import { DisplayCompanyDialogComponent } from './finance-Folder/finance-dialogues/display-company-dialog/display-company-dialog.component';
import { OrgUnitListComponent } from './finance-Folder/org-unit-list/org-unit-list.component';
import { OrgDetailsCompanyComponent } from './finance-Folder/org-details-company/org-details-company.component';
import { OrgDetailsCompanyCodeComponent } from './finance-Folder/org-details-company-code/org-details-company-code.component';
import { OrgDetailsChartofaccountsComponent } from './finance-Folder/org-details-chartofaccounts/org-details-chartofaccounts.component';
import { OrgDetailsControllingareaComponent } from './finance-Folder/org-details-controllingarea/org-details-controllingarea.component';
import { OrgDetailsBusinessareaComponent } from './finance-Folder/org-details-businessarea/org-details-businessarea.component';
import { OrgDetailsSalesareaComponent } from './finance-Folder/org-details-salesarea/org-details-salesarea.component';
import { OrgDetailsReportingareaComponent } from './finance-Folder/org-details-reportingarea/org-details-reportingarea.component';
import { CreateCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/create-company-code-dialog/create-company-code-dialog.component';
import { DisplayCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/display-company-code-dialog/display-company-code-dialog.component';
import { EditCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/edit-company-code-dialog/edit-company-code-dialog.component';
import { DeleteCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/delete-company-code-dialog/delete-company-code-dialog.component';
import { GlTransactionCodesComponent } from './finance-Folder/general-ledger/gl-transaction-codes/gl-transaction-codes.component';
import { TransCodeListComponent } from './finance-Folder/general-ledger/trans-code-list/trans-code-list.component';
import { AccountGroupDetailsComponent } from './finance-Folder/general-ledger/account-group-details/account-group-details.component';
import { TaxCodeDetailsComponent } from './finance-Folder/general-ledger/tax-code-details/tax-code-details.component';
import { FinanceLandingPageComponent } from './finance-Folder/finance-home/finance-landing-page/finance-landing-page.component';
import { AccountGroupDialogComponent } from './finance-Folder/general-ledger/gl-dialogues/account-group-dialog/account-group-dialog.component';
import { TaxCodeDialogComponent } from './finance-Folder/general-ledger/gl-dialogues/tax-code-dialog/tax-code-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as financeReducers from './store/reducers/finance.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GeneralLedgerMasterDataEffect } from './store/effects/generel-ledger-master-data.effects';
import { GeneralLedgerReportsComponent } from './finance-Folder/general-ledger/general-ledger-reports/general-ledger-reports.component';
import { MasterDataReportComponent } from './finance-Folder/general-ledger/general-ledger-reports/master-data-report/master-data-report.component';
import { GlLineItemsComponent } from './finance-Folder/general-ledger/general-ledger-reports/gl-line-items/gl-line-items.component';
import { TrialBalanceComponent } from './finance-Folder/general-ledger/general-ledger-reports/trial-balance/trial-balance.component';

@NgModule({
  declarations: [
    FinanceLayoutComponent,
    FinanceHomeComponent,
    FinanceLayoutComponent,
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
    GeneralLedgerReportsComponent,
    MasterDataReportComponent,
    GlLineItemsComponent,
    TrialBalanceComponent,
  ],
  imports: [

    FinanceLayoutRoutingModule,
    SharedModule,
    StoreModule.forFeature('financeModule', financeReducers.financeReducers),
    EffectsModule.forFeature([GeneralLedgerMasterDataEffect]),
  ],
})
export class FinanceLayoutModule {}
