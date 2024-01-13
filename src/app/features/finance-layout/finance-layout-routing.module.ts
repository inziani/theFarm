import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceLayoutComponent } from './finance-layout.component';
import { FinanceHomeComponent } from './finance-Folder/finance-home/finance-home.component';
import { GlTransactionCodesComponent } from './finance-Folder/general-ledger/gl-transaction-codes/gl-transaction-codes.component';
import { GlMasterDataComponent } from './finance-Folder/general-ledger/gl-master-data/gl-master-data.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceLayoutComponent,
    children: [
      { path: 'financeHome', component: FinanceHomeComponent },
      { path: 'glTransactionsCodes', component: GlTransactionCodesComponent },
      { path: 'glMasterData', component: GlMasterDataComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceLayoutRoutingModule {}
