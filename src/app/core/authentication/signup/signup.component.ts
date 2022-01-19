import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { SignUpFormControl, SignUpFormGroup } from '@app/core/shared/models/signupform.model';
import { SignUpCredentials } from '@app/core/shared/models/authentication.model';
import { Gender } from '@app/core/shared/interfaces/gender';
import { MAT_DATE_FORMATS } from '@angular/material/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {

 public datePipe!: any;

 public gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
  ];

  public formGroup = new SignUpFormGroup();
  public userSignUp!: SignUpCredentials;
  public maxDate!: Date;

  public isLoading = false;
  public formSubmitted: boolean = false;
  public error!: string | null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private dateFormat: DatePipe

  ) {

    this.datePipe = dateFormat;
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);



  }

  signUp(form: NgForm) {
    if (!form.valid) {
      return
    }
    this.isLoading = true;
    const first_name = form.value.first_name;
    const last_name = form.value.last_name;
    const date_of_birth = form.value.birthday;
    const phone_number = form.value.phone_number;
    const username = form.value.username;
    const gender = form.value.gender;
    const city = form.value.city;
    const email = form.value.email;
    const password = form.value.password;
    this.authenticationService.onUserSignOn(first_name, last_name, date_of_birth, phone_number, username, gender, city, email, password).subscribe(signUpData => {
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
      this.userSignUp.first_name,
      this.userSignUp.last_name,
      this.datePipe.transform(this.userSignUp.date_of_birth, 'yyyy-MM-dd'),
      this.userSignUp.phone_number,
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
