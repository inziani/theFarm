import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceLayoutComponent } from './finance-layout.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceLayoutComponent,
  },

  {
    path: 'generalLedger',
    loadChildren: () =>
      import('./general-ledger/general-ledger.module').then(
        (m) => m.GeneralLedgerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceLayoutRoutingModule {}
