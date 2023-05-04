import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { SalesOrderProcessComponent } from '@app/sales/sales-order-process/sales-order-process.component';
import { authenticationGuard } from '@app/_helpers/authentication.guard';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'orderProcessing',
        component: SalesOrderProcessComponent,
        canActivate: [authenticationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
