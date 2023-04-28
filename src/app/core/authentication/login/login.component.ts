
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginFormGroup } from '@app/core/shared/models/loginform.model';
import { LoginCredentials } from '@app/core/shared/models/authentication.model';
import { LoginDialogComponent } from '@app/core/dialogues/login-dialog/login-dialog.component';

import { AuthenticationService } from '@app/core/services/authentication.service';

import { MatDialog, _closeDialogVia } from '@angular/material/dialog';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
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
  public isLoading = false;
  public errorMessage: string = '';
  public token!: string;



  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(
    private _dataSource: RestDataSource,
    private _authenticationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {

  }

  public submitForm() {
    if (!this.formGroup.valid) {
      return;
    }
    this.isLoading = true;
    this.formSubmitted = true;
    this.userLoggingIn = this.formGroup.value;
    this._authenticationService
      .onLogOn(this.userLoggingIn.email, this.userLoggingIn.password)
      .subscribe({
        next: (jwtTokens) => {
          if (jwtTokens) {
            this._dialog.open(LoginDialogComponent);
            this._router.navigate(['home']);
          }
        },
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Completed'),
      });
    this.formGroup.reset();
    this.formSubmitted = false;
    this.isLoading = false;
  }


}
