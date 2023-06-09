import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { SignUpFormGroup } from '@app/authentication/models/signupform.model';
import { SignUpCredentials } from '@app/authentication/models/authentication.model';
import { Gender } from '@app/shared/interfaces/users-interface';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild(MatAccordion) private accordion!: MatAccordion;

  public datePipe!: any;
  public gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
  ];

  public formGroup = new SignUpFormGroup();
  public userSignUp!: SignUpCredentials;
  public maxDate!: Date;

  public isLoading = false;
  public formSubmitted: boolean = false;
  public errorMessage!: string | null;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _dateFormat: DatePipe
  ) {
    this.datePipe = _dateFormat;
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  public submitForm() {
    if (!this.formGroup.valid) {
      return;
    }
    this.userSignUp = this.formGroup.value;
    console.log(this.userSignUp);
    this.formSubmitted = true;
    this._authenticationService
      .onUserSignOn(
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
      .subscribe({
        next: (userCreated) =>
          this._dialog.open(ObjectCreatedComponent, {
            data: (this.userSignUp.username = userCreated.username),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Complete'),
      });
    this.isLoading = false;
    this.formGroup.reset();
    this.formSubmitted = false;
    this._router.navigate(['/login']);
  }
}
