import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralLedgerComponent } from './general-ledger.component';
import { FinanceHomeComponent } from '../finance-Folder/finance-home/finance-home.component';
import { GlTransactionCodesComponent } from './gl-transaction-codes/gl-transaction-codes.component';
import { GlMasterDataComponent } from './gl-master-data/gl-master-data.component';
import { GeneralLedgerReportsComponent } from './general-ledger-reports/general-ledger-reports.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralLedgerComponent,
    children: [
      { path: 'financeOrgStructures', component: FinanceHomeComponent },
      { path: 'glTransactionsCodes', component: GlTransactionCodesComponent },
      { path: 'glMasterData', component: GlMasterDataComponent },
      { path: 'glReports', component: GeneralLedgerReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralLedgerRoutingModule {}
