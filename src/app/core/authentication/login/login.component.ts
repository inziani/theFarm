import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationFormControl, AuthenticationFormGroup } from '@app/shared/models/form.model';
import { LoginCredentials } from '@app/shared/models/login.model';




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

  formGroup = new AuthenticationFormGroup();
  userLogin!: LoginCredentials;
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
          // console.log(success);
          if (success) {
            alert("Welcome to small farmers.")
            this.router.navigate(['home']);
          }
        },
        error => {
          this.error = 'Login Unsuccessful! Try again'
          this.isLoading = false;
          console.log(this.error);
        }
      );
    form.reset();
  };

  // submitForm() {
  //   Object.keys(this.formGroup.controls).forEach(c: => this.userLogin[c] = this.formGroup.controls[c].value);
  //   this.formSubmitted = true;
  //   this.formGroup.reset();
  //   this.formSubmitted = false;



  // }

}
