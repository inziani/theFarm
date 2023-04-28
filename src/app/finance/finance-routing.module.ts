import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceLayoutComponent } from './finance-layout/finance-layout.component';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { authenticationGuard } from '@app/_helpers/authentication.guard';
import { GlMasterDataComponent } from './general-ledger/gl-master-data/gl-master-data.component';
import { GlTransactionCodesComponent } from './general-ledger/gl-transaction-codes/gl-transaction-codes.component';

const routes: Routes = [
  // Finance Module Layout and routes
  {
    path: '',
    component: FinanceLayoutComponent,
    children: [
      {
        path: 'financeHome',
        component: FinanceHomeComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'glmasterdata',
        component: GlMasterDataComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: 'glTransactionsCodes',
        component: GlTransactionCodesComponent,
        canActivate: [authenticationGuard],
      },
    ],
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
