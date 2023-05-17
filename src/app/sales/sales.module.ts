import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { SalesOrderProcessComponent } from './sales-order-process/sales-order-process.component';
import { SalesSidenavComponent } from './sales-sidenav/sales-sidenav.component';

@NgModule({
  declarations: [SalesComponent, SalesOrderProcessComponent, SalesSidenavComponent],
  imports: [CommonModule, SalesRoutingModule, MaterialModule, SharedModule],
})
export class SalesModule {}