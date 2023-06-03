import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FinanceNavbarComponent } from '@app/features/finance/finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from '@app/features/finance/finance-sidenav/finance-sidenav.component';
import { MaterialModule } from '@app/material.module';
import { UnauthorizedServeResponseComponent } from './unauthorized-serve-response/unauthorized-serve-response.component';
import { SideNavComponent } from '@app/core/side-nav/side-nav.component';
// import { HomeSidenavComponent } from '@app/core/home-sidenav/home-sidenav.component';
// import { HeaderComponent } from '@app/core/header/header.component';

@NgModule({
  declarations: [
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,
    SideNavComponent,
    // HomeSidenavComponent,
    // HeaderComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, MaterialModule],
  exports: [
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    SideNavComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SharedModule {}
