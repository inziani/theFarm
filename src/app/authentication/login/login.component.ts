import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormGroup } from '@app/authentication/models/loginform.model';
import {
  JWTDecodedTokenInterface,
  UserLogin,
} from '@app/authentication/models/authentication.model';
import { LoginDialogComponent } from '@app/shared/user-feedback-dialogues/login-dialog/login-dialog.component';

import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { MatDialog, _closeDialogVia } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AuthenticationState,
  State,
} from '../store/state/authentication.state';
import { AuthenticationActions } from '../store/actions/authentication.actions';
// import { selectJwtToken } from '../store/selectors/authentication.selector';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { selectUserList } from '@app/features/human-resources/store/selectors/user.selector';
// import { ActivityActions } from '@app/profile/store/actions/profile.actions';

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
  public jwtHelper = new JwtHelperService();

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _store: Store<AuthenticationState>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
    this._router.navigate(['/home']);
    // this._dialog.open(LoginDialogComponent);

    // this._authenticationService
    //   .onLogOnTest(this.userLoggingIn.email, this.userLoggingIn.password)
    //   .subscribe({
    //     next: (jwtTokens) => {
    //       if (jwtTokens) {
    //         this._dialog.open(LoginDialogComponent);
    //         this._router.navigate(['/profile']);
    //       }
    //     },
    //     error: (err) => {
    //       this.errorMessage = err;
    //     },
    //     complete: () => console.info('Completed'),
    //   });
    this.formGroup.reset();
    this.formSubmitted = false;
  }
}
