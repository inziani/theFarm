import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormGroup } from '@app/authentication/models/loginform.model';
import { UserLogin } from '@app/authentication/models/authentication.model';
import { LoginDialogComponent } from '@app/shared/user-feedback-dialogues/login-dialog/login-dialog.component';

import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { MatDialog, _closeDialogVia } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/state/authentication.state';
// import { se } from '../store/selectors/authentication.selector';
import { AuthenticationActions } from '../store/actions/authentication.actions';
import { selectJwtToken } from '../store/selectors/authentication.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formGroup = new LoginFormGroup();
  public userLoggingIn!: UserLogin;
  public formSubmitted: boolean = false;
  public isLoginMode = true;
  public isLoading$!: Observable<boolean>;
  public logInDetails!: {};
  public errorMessage: string = '';
  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  public isAuthenticated!: boolean;
  // public UserLogInFromAction!: AuthenticationActions.UserLogIn;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _store: Store<State>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._store.select(selectJwtToken).subscribe({
      next: (token) => console.log('Store Token - ', token),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed Token Fetching'),
    });
  }

  public checkRememberMeBox() {
    this._store.dispatch(
      AuthenticationActions['[Authentication]RememberMeCheckBox']()
    );
  }

  public submitForm() {
    if (!this.formGroup.valid) {
      return;
    }
    this.formSubmitted = true;
    this.userLoggingIn = this.formGroup.value;
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserLogIn']({
        userLogin: this.userLoggingIn,
      })
    );
    this._authenticationService
      .onLogOnTest(this.userLoggingIn.email, this.userLoggingIn.password)
      .subscribe({
        next: (jwtTokens) => {
          if (jwtTokens) {
            this._dialog.open(LoginDialogComponent);
            this._router.navigate(['/profile']);
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
