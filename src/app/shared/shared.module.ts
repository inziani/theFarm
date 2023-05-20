import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FinanceNavbarComponent } from '@app/finance/finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from '@app/finance/finance-sidenav/finance-sidenav.component';
import { MaterialModule } from '@app/material.module';
import { UnauthorizedServeResponseComponent } from './unauthorized-serve-response/unauthorized-serve-response.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/app.reducer';




@NgModule({
  declarations: [
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,

  ],
  imports: [CommonModule, SharedRoutingModule, MaterialModule, StoreModule.forRoot({ globalReducer: reducers.ui})],
  exports: [FinanceNavbarComponent, FinanceSidenavComponent],
})
export class SharedModule {}
