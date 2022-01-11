import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { SignUpFormControl, SignUpFormGroup } from '@app/shared/models/signupform.model';
import { SignUpCredentials } from '@app/shared/models/authentication.model';
import { Gender } from '@app/shared/interfaces/gender';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
  ];

  formGroup = new SignUpFormGroup();


  userSignUp: SignUpCredentials = new SignUpCredentials("", "", new Date(), NaN, "", "", "", "", "", "");
  // test: SignUpCredentials[] = [];
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
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const birthday = form.value.birthday;
    const phoneNumber = form.value.firstName;
    const username = form.value.username;
    const gender = form.value.lastName;
    const city = form.value.birthday;
    const email = form.value.email;
    const password = form.value.email;
    this.authenticationService.onUserSignOn(firstName, lastName, birthday, phoneNumber, username, gender, city, email, password).subscribe(signUpData => {
      console.log(signUpData);
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
    this.userSignUp = this.formGroup.value;
    console.log(this.userSignUp);
    this.formSubmitted = true;
    this.authenticationService.onUserSignOn(
      this.userSignUp.firstName,
      this.userSignUp.lastName,
      this.userSignUp.birthday,
      this.userSignUp.phoneNumber,
      this.userSignUp.username,
      this.userSignUp.gender,
      this.userSignUp.city,
      this.userSignUp.email,
      this.userSignUp.password
    )
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
