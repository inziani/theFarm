
import { Component, OnInit } from '@angular/core';
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
  private requestData$!: Observable<any>;

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(
    private _dataSource: RestDataSource,
    private _authenticationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialogue: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestData$ = this._authenticationService.userData$;
  }

  public submitForm() {
    if (!this.formGroup.valid) {
      return;
    }
    this.isLoading = true;
    this.formSubmitted = true;
    this.userLoggingIn = this.formGroup.value;
    this._authenticationService
      .login(this.userLoggingIn.email, this.userLoggingIn.password)
      .subscribe({
        next: (jwtTokens) => {
          console.log('Access Token - ', jwtTokens.access);
          console.log('Refresh Token - ', jwtTokens.refresh);
        },
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Completed'),
      });
  }

  // public logIn(form: NgForm) {
  //   if (!form.valid) {
  //     return
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.isLoading = true;
  //   this.authenticationService.getToken(email, password)
  //     .subscribe(
  //       success => {
  //         if (success) {
  //           alert("Welcome to small farmers.")
  //           this.router.navigate(['home']);
  //         }
  //       },
  //       error => {
  //         this.errorMessage = 'Login Unsuccessful! Try again'
  //         this.isLoading = false;
  //       }
  //     );
  //   form.reset();
  // };

  // public submitForm() {
  //   if (!this.formGroup.valid) {
  //     return
  //   }
  //   Object.keys(this.formGroup.controls).forEach(c =>
  //     this.userLogin['password'] = this.formGroup.controls['password'].value);
  //   this.userLogin['email'] = this.formGroup.controls['email'].value;
  //   this.isLoading = true;
  //   this.formSubmitted = true;
  //   this.authenticationService.getToken(this.userLogin.email, this.userLogin.password)
  //     .subscribe({

  //       next: (success) => {
  //         this.dialogue.open(LoginDialogComponent);
  //         this.router.navigate(['home']);
  //       },
  //       error: (error)=> {
  //         this.errorMessage = error;
  //         this.isLoading = false;
  //       },
  //       complete: () => console.info('complete')
  //     });

  //   this.formGroup.reset();
  //   this.formSubmitted = false;
  // }
}
