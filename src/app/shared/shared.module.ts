import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FinanceNavbarComponent } from '@app/features/finance-layout/finance-Folder/finance-navbar/finance-navbar.component';
import { FinanceSidenavComponent } from '@app/features/finance-layout/finance-Folder/finance-sidenav/finance-sidenav.component';
import { MaterialModule } from '@app/material.module';
import { UnauthorizedServeResponseComponent } from './user-feedback-dialogues/unauthorized-serve-response/unauthorized-serve-response.component';
import { SideNavComponent } from '@app/home-page/side-nav/side-nav.component';
import { DeleteActivityDialogComponent } from '../profile/user-activity/delete-activity-dialog/delete-activity-dialog.component';
import { DeleteCategoryDialogComponent } from '../profile/user-activity/delete-category-dialog/delete-category-dialog.component';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
import { DeleteDialogComponent } from './user-feedback-dialogues/delete-dialog/delete-dialog.component';
import { ObjectCreatedComponent } from './user-feedback-dialogues/object-created/object-created.component';
import { ChangesSavedDialogComponent } from './user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { LoginDialogComponent } from './user-feedback-dialogues/login-dialog/login-dialog.component';
import { HeaderComponent } from '../home-page/header/header.component';

@NgModule({
  declarations: [
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,
    SideNavComponent,
    DeleteActivityDialogComponent,
    DeleteCategoryDialogComponent,
    UserUpdateDialogComponent,
    DeleteDialogComponent,
    ObjectCreatedComponent,
    ChangesSavedDialogComponent,
    LoginDialogComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponent,
    FinanceNavbarComponent,
    FinanceSidenavComponent,
    UnauthorizedServeResponseComponent,
    SideNavComponent,
    DeleteActivityDialogComponent,
    DeleteCategoryDialogComponent,
    UserUpdateDialogComponent,
    DeleteDialogComponent,
    ObjectCreatedComponent,
    ChangesSavedDialogComponent,
    LoginDialogComponent,
    HeaderComponent,
    MaterialModule,
  ],
})
export class SharedModule {}
