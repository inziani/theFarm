import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from '@app/_helpers/authentication.guard';
import { AccountSettingsComponent } from '@app/core/application-components/profile/account-settings/account-settings.component';
import { RoleAuthComponent } from '@app/core/application-components/profile/role-auth/role-auth.component';

const routes: Routes = [
  // {
  //   path: 'rolesAndAuthorizationa',
  //   component: RoleAuthComponent,
  //   canActivate: [canActivate],
  //   data: {
  //     authorities: ['ROLE_ADMIN'],
  //   },
  // },

  // {
  //   path: 'userList',
  //   component: AccountSettingsComponent,
  //   canActivate: [canActivate],
  //   data: {
  //     authorities: ['ROLE_ADMIN'],
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
