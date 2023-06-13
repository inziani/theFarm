import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormGroup } from '@app/authentication/models/loginform.model';
import { LoginCredentials } from '@app/authentication/models/authentication.model';
import { LoginDialogComponent } from '@app/shared/user-feedback-dialogues/login-dialog/login-dialog.component';

import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { MatDialog, _closeDialogVia } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/state/authentication.state';
import { getLogin } from '../store/selectors/authentication.selector';
import * as AuthenticationLoginActions from '../store/actions/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formGroup = new LoginFormGroup();
  public userLoggingIn!: LoginCredentials;
  public formSubmitted: boolean = false;
  public isLoginMode = true;
  public isLoading$!: Observable<boolean>;
  public logInDetails!: {};
  public errorMessage: string = '';
  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  public isAuthenticated!: boolean;
  public UserLogInFromAction!: AuthenticationLoginActions.UserLogIn;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _store: Store<State>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._store.select(getLogin).subscribe({
      next: (loginDetails) => {
        this.logInDetails = loginDetails;
        console.log('remeberMeCheckBox', this.logInDetails);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('State Completed'),
    });
  }

  public checkRememberMeBox() {
    this._store.dispatch(AuthenticationLoginActions.rememberMeCheckBox());
  }

  public submitForm() {
    if (!this.formGroup.valid) {
      return;
    }
    // this.isLoading = true;
    this.formSubmitted = true;
    this.userLoggingIn = this.formGroup.value;
    this.UserLogInFromAction = {
      userEmail: this.userLoggingIn.email,
      isAuthenticated: !this.isAuthenticated,
    };

    this._store.dispatch(
      AuthenticationLoginActions.logIn({
        userDetails: this.UserLogInFromAction,
      })
    );
    console.log('UserLoginDetails - ', this.UserLogInFromAction);

    this._authenticationService
      .onLogOn(this.userLoggingIn.email, this.userLoggingIn.password)
      .subscribe({
        next: (jwtTokens) => {
          if (jwtTokens) {
            this._dialog.open(LoginDialogComponent);
            this._router.navigate(['activity']);
          }
        },
        error: (err) => {
          this.errorMessage = err;
        },
        complete: () => console.info('Completed'),
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  }
}
