import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FinanceNavbarComponent } from '@app/finance/finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from '@app/finance/finance-sidenav/finance-sidenav.component';
import { MaterialModule } from '@app/material.module';
import { UnauthorizedServeResponseComponent } from './unauthorized-serve-response/unauthorized-serve-response.component';
import { HeaderComponent } from '@app/core/header/header.component';


@NgModule({
  declarations: [
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, MaterialModule],
  exports: [FinanceNavbarComponent, FinanceSidenavComponent, HeaderComponent],
})
export class SharedModule {}
