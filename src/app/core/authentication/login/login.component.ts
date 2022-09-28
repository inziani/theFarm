
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginFormGroup } from '@app/core/shared/models/loginform.model';
import { LoginCredentials } from '@app/core/shared/models/authentication.model';
import { LoginDialogComponent } from '@app/core/dialogues/login-dialog/login-dialog.component';

import { AuthenticationService } from '@app/core/services/authentication.service';

import { MatDialog, _closeDialogVia } from '@angular/material/dialog';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  public formGroup = new LoginFormGroup();
  public userLogin: LoginCredentials = new LoginCredentials("", "");
  public formSubmitted: boolean = false;
  public isLoginMode = true;
  public isLoading = false;
  public error: string = '';
  public token!: string;


  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

  }

  constructor(
    public dataSource: RestDataSource,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogue: MatDialog
  ) {

  }

  ngOnInit(): void {

  }

  public logIn(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.authenticationService.getToken(email, password)
      .subscribe(
        success => {
          if (success) {
            alert("Welcome to small farmers.")
            this.router.navigate(['home']);
          }
        },
        error => {
          this.error = 'Login Unsuccessful! Try again'
          this.isLoading = false;
        }
      );
    form.reset();
  };

 public submitForm() {
    if (!this.formGroup.valid) {
      return
    }
    Object.keys(this.formGroup.controls).forEach(c =>
      this.userLogin['password'] = this.formGroup.controls['password'].value);
   this.userLogin['email'] = this.formGroup.controls['email'].value;
   this.isLoading = true;
   this.formSubmitted = true;
   this.authenticationService.getToken(this.userLogin.email, this.userLogin.password)
      .subscribe(
        success => {
          if (success) {
            this.dialogue.open(LoginDialogComponent);
            this.router.navigate(['home']);
          }
        },
        error => {
          this.error = 'Login Unsuccessful! Try again';
          alert(this.error);
          this.isLoading = false;
        }
      );
    this.formGroup.reset();
    this.formSubmitted = false;
  }
}
