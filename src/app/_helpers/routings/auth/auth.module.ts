import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.module';
// import { AppLayoutComponent } from '@app/app-layout/app-layout.component';
// import { AuthenticationLayoutComponent } from '@app/authentication-layout/authentication-layout.component';
// import { ActivityCategorysComponent } from '@app/core/application-components/activity-categorys/activity-categorys.component';
// import { EditActivityComponent } from '@app/core/application-components/edit-activity/edit-activity.component';
// import { BioComponent } from '@app/core/application-components/profile/bio/bio.component';
// import { PasswordSecComponent } from '@app/core/application-components/profile/password-sec/password-sec.component';
// import { ProfileComponent } from '@app/core/application-components/profile/profile.component';
// import { RoleAuthComponent } from '@app/core/application-components/profile/role-auth/role-auth.component';
// import { TodoComponent } from '@app/core/application-components/todo/todo.component';
// import { LoginComponent } from '@app/core/authentication/login/login.component';
// import { SignupComponent } from '@app/core/authentication/signup/signup.component';
// import { HomePageComponent } from '@app/core/home-page/home-page.component';
// import { ProfileLayoutComponent } from '@app/profile-layout/profile-layout.component';
// import { SideNavComponent } from '@app/core/side-nav/side-nav.component';
// import { HeaderComponent } from '@app/core/header/header.component';
// import { HomeSidenavComponent } from '@app/core/home-sidenav/home-sidenav.component';
// import { FooterComponent } from '@app/core/footer/footer.component';
// import { ProfileSidenavComponent } from '@app/core/application-components/profile/profile-sidenav/profile-sidenav.component';
// import { ModulesComponent } from './../../../core/modules/modules.component'
// import { LoadingSpinnerComponent } from '@app/_helpers/loading-spinner/loading-spinner.component';
// import { AccountSettingsComponent } from '@app/core/application-components/profile/account-settings/account-settings.component';
// import { LoginDialogComponent } from '@app/core/dialogues/login-dialog/login-dialog.component';
// import { EditCategoryComponent } from '@app/core/application-components/edit-category/edit-category.component';
// import { CreateCategoryComponent } from '@app/core/application-components/create-category/create-category.component';
// import { DeleteCategoryDialogComponent } from '@app/core/dialogues/delete-category-dialog/delete-category-dialog.component';
// import { CreateActivityComponent } from '@app/core/application-components/create-activity/create-activity.component';
// import { DeleteActivityDialogComponent } from '@app/core/dialogues/delete-activity-dialog/delete-activity-dialog.component';
// import { AgricultureDialogueComponent } from '@app/core/dialogues/agriculture-dialogue/agriculture-dialogue.component';
// import { FinanceDialogueComponent } from '@app/core/dialogues/finance-dialogue/finance-dialogue.component';
// import { HrDialogueComponent } from '@app/core/dialogues/hr-dialogue/hr-dialogue.component';
// import { MaterialsDialogueComponent } from '@app/core/dialogues/materials-dialogue/materials-dialogue.component';
// import { ProjectsDialogueComponent } from '@app/core/dialogues/projects-dialogue/projects-dialogue.component';
// import { KnowledgeDialogueComponent } from '@app/core/dialogues/knowledge-dialogue/knowledge-dialogue.component';
// import { UserUpdateDialogComponent } from '@app/core/dialogues/user-update-dialog/user-update-dialog.component';



@NgModule({
  declarations: [
    // AppLayoutComponent,
    // SideNavComponent,
    // HeaderComponent,
    // AuthenticationLayoutComponent,
    // ActivityCategorysComponent,
    // EditActivityComponent,
    // BioComponent,
    // PasswordSecComponent,
    // ProfileComponent,
    // RoleAuthComponent,
    // TodoComponent,
    // LoginComponent,
    // SignupComponent,
    // HomePageComponent,
    // ProfileLayoutComponent,
    // HomeSidenavComponent,
    // FooterComponent,
    // ProfileSidenavComponent,
    // ModulesComponent,
    // LoadingSpinnerComponent,
    // AccountSettingsComponent,
    // LoginDialogComponent,
    // EditCategoryComponent,
    // CreateCategoryComponent,
    // DeleteCategoryDialogComponent,
    // CreateActivityComponent,
    // DeleteActivityDialogComponent,
    // AgricultureDialogueComponent,
    // FinanceDialogueComponent,
    // HrDialogueComponent,
    // MaterialsDialogueComponent,
    // ProjectsDialogueComponent,
    // KnowledgeDialogueComponent,
    // UserUpdateDialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthModule {}
