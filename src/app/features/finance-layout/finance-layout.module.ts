import { NgModule } from '@angular/core';

import { FinanceLayoutRoutingModule } from './finance-layout-routing.module';
import { FinanceLayoutComponent } from './finance-layout.component';
// Finance components
import { FinanceFooterComponent } from './finance-Folder/finance-footer/finance-footer.component';
import { CompanyDialogComponent } from './finance-Folder/finance-dialogues/company-dialog/company-dialog.component';
import { ChartOfAccountsDialogComponent } from './finance-Folder/finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { ReportingAreaDialogComponent } from './finance-Folder/finance-dialogues/reporting-area-dialog/reporting-area-dialog.component';
import { ControllingAreaDialogComponent } from './finance-Folder/finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { BusinessAreaDialogComponent } from './finance-Folder/finance-dialogues/business-area-dialog/business-area-dialog.component';
import { DeleteCompanyDialogComponent } from './finance-Folder/finance-dialogues/delete-company-dialog/delete-company-dialog.component';
import { CreateCompanyDialogComponent } from './finance-Folder/finance-dialogues/create-company-dialog/create-company-dialog.component';
import { DisplayCompanyDialogComponent } from './finance-Folder/finance-dialogues/display-company-dialog/display-company-dialog.component';
import { CreateCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/create-company-code-dialog/create-company-code-dialog.component';
import { DisplayCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/display-company-code-dialog/display-company-code-dialog.component';
import { EditCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/edit-company-code-dialog/edit-company-code-dialog.component';
import { DeleteCompanyCodeDialogComponent } from './finance-Folder/finance-dialogues/delete-company-code-dialog/delete-company-code-dialog.component';
import { AccountGroupDialogComponent } from './general-ledger/gl-dialogues/account-group-dialog/account-group-dialog.component';
import { TaxCodeDialogComponent } from './general-ledger/gl-dialogues/tax-code-dialog/tax-code-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as financeReducers from './store/reducers/finance.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GeneralLedgerMasterDataEffect } from './store/effects/generel-ledger-master-data.effects';
import { GeneralLedgerMasterDataInterfaceEffect } from './store/effects/general-ledger-master-interface-effects';

@NgModule({
  declarations: [
    FinanceLayoutComponent,
    FinanceLayoutComponent,
    FinanceFooterComponent,
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
    AccountGroupDialogComponent,
    TaxCodeDialogComponent,
  ],
  imports: [
    FinanceLayoutRoutingModule,
    SharedModule,
    StoreModule.forFeature('financeModule', financeReducers.financeReducers),
    EffectsModule.forFeature([
      GeneralLedgerMasterDataEffect,
      GeneralLedgerMasterDataInterfaceEffect,
    ]),
  ],
})
export class FinanceLayoutModule {
  constructor() {}
}
