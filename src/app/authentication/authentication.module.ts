import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '@app/material.module';
import { StoreModule } from '@ngrx/store';
import { userLoginAuthenticationReducer } from './store/reducers/authentication.reducer';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('authentication', userLoginAuthenticationReducer),
  ],
})
export class AuthenticationModule {
  constructor() {}
}
