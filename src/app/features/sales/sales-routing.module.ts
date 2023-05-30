import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { SalesOrderProcessComponent } from '@app/features/sales/sales-order-process/sales-order-process.component';
import { authenticationGuard } from '@app/_helpers/authentication.guard';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'salesOrder',
        component: SalesOrderProcessComponent,
        canActivate: [authenticationGuard],
        children: [],
      },
      {
        path: 'saleReports',
        component: SalesOrderProcessComponent,
        canActivate: [authenticationGuard],
      },
      {
        path: '',
        component: SalesComponent,
        canActivate: [authenticationGuard],
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
