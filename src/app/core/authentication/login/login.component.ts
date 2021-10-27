import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginFormControl, LoginFormGroup } from '@app/shared/models/loginform.model';
import { LoginCredentials } from '@app/shared/models/authentication.model';




import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  formGroup = new LoginFormGroup();
  userLogin: LoginCredentials = new LoginCredentials("", "");
  formSubmitted: boolean = false;

  isLoginMode = true;
  isLoading = false;
  error: string = '';
  token!: string;


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

  }

  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  logIn(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.authenticationService.onLogin(email, password)
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

  submitForm() {
    if (!this.formGroup.valid) {
      return
    }
    Object.keys(this.formGroup.controls).forEach(c =>
      this.userLogin['password'] = this.formGroup.controls['password'].value);
    this.userLogin['email'] = this.formGroup.controls['email'].value;
    this.formSubmitted = true;
    this.authenticationService.onLogin(this.userLogin.email, this.userLogin.password)
      .subscribe(
        success => {
          if (success) {
            alert("Welcome to small farmers.")
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
