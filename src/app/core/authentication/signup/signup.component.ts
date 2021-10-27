import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { SignUpFormControl, SignUpFormGroup } from '@app/shared/models/signupform.model';
import { SignUpCredentials } from '@app/shared/models/authentication.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup = new SignUpFormGroup();
  userSignUp: SignUpCredentials = new SignUpCredentials("", "", "", "", "", "", "", "");
  public maxDate!: Date;

  isLoading = false;
  formSubmitted: boolean = false;
  error!: string | null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

  }

  signUp(form: NgForm) {
    if (!form.valid) {
      return
    }
    this.isLoading = true;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.email;
    this.authenticationService.onUserSignOn(username, email, password).subscribe(signUpData => {
      // console.log(signUpData);
      this.isLoading = false;
      this.router.navigate(['/login']);
    },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      })
    form.reset();
  }

  submitForm() {
    if (!this.formGroup.valid) {
      return
    }
    Object.keys(this.formGroup.controls).forEach(c =>
      this.userSignUp['firstName'] = this.formGroup.controls['firstName'].value);
    this.userSignUp['lastName'] = this.formGroup.controls['email'].value;
    this.userSignUp['birthday'] = this.formGroup.controls['lastName'].value;
    this.userSignUp['phoneNumber'] = this.formGroup.controls['phoneNumber'].value;
    this.userSignUp['username'] = this.formGroup.controls['username'].value;
    this.userSignUp['email'] = this.formGroup.controls['email'].value;
    this.userSignUp['password'] = this.formGroup.controls['password'].value;
    this.userSignUp['confirmPassword'] = this.formGroup.controls['confirmPassword'].value;


    console.log(
      this.userSignUp.firstName,
      this.userSignUp.lastName,
      this.userSignUp.birthday,
      this.userSignUp.phoneNumber,
      this.userSignUp.username,
      this.userSignUp.email,
      this.userSignUp.password
    );

    this.formSubmitted = true;
    this.authenticationService.onUserSignOn(this.userSignUp.username, this.userSignUp.email, this.userSignUp.password,)
      .subscribe(
        success => {
          if (success) {
            alert("Welcome to small farmers. You can now log in and access your account")
            this.router.navigate(['login']);
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
