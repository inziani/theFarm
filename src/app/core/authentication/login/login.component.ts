
import { Component, OnInit, inject } from '@angular/core';
import {  Router } from '@angular/router';

import { LoginFormGroup } from '@app/core/shared/models/loginform.model';
import { LoginCredentials } from '@app/core/shared/models/authentication.model';
import { LoginDialogComponent } from '@app/core/dialogues/login-dialog/login-dialog.component';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog, _closeDialogVia } from '@angular/material/dialog';

import * as fromRoot from '@app/app.reducer';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';



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
  public errorMessage: string = '';
  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _store: Store<fromRoot.State>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {

    // this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    console.log('What came here?-', this.isLoading$);
    this._store.subscribe(state => console.log('this is state in logonComponent-', state));




  }

  public submitForm() {
    if (!this.formGroup.valid) {
      return;
    }
    // this.isLoading = true;
    this.formSubmitted = true;
    this.userLoggingIn = this.formGroup.value;
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
