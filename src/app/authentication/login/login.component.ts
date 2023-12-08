import { Component, OnInit } from '@angular/core';
import { LoginFormGroup } from '@app/authentication/models/loginform.model';
import { UserLogin } from '@app/authentication/models/authentication.model';
import { _closeDialogVia } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../store/state/authentication.state';
import { AuthenticationActions } from '../store/actions/authentication.actions';
import { UIActions } from '@app/store/actions/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formGroup = new LoginFormGroup();
  public userLoggingIn!: UserLogin;
  public formSubmitted: boolean = false;

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
      UIActions['[UILoadingPage]StartLoading']({ isLoading: true })
    );
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserLogIn']({
        userLogin: this.userLoggingIn,
      })
    );
    this.formGroup.reset();
    this.formSubmitted = false;
  }
  constructor(private _store: Store<AuthenticationState>) {}
}
