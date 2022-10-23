
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { SignUpFormGroup } from '@app/core/shared/models/signupform.model';
import { SignUpCredentials } from '@app/core/shared/models/authentication.model';
import { Gender } from '@app/core/shared/interfaces/users-interface';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ObjectCreatedComponent } from '@app/core/dialogues/object-created/object-created.component';




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
    { value: 'Male', viewValue: 'Male' }
  ];

  public formGroup = new SignUpFormGroup();
  public userSignUp!: SignUpCredentials;
  public maxDate!: Date;

  public isLoading = false;
  public formSubmitted: boolean = false;
  public errorMessage!: string | null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private dateFormat: DatePipe

  ) {

    this.datePipe = dateFormat;
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

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
      .subscribe({
        next: (userCreated) => this.dialog.open(ObjectCreatedComponent,
          {data: this.userSignUp.username = userCreated.username}),
        error: (err) => this.errorMessage = err,
        complete: () => console.log('Complete')
      });
    this.isLoading = false;
    this.formGroup.reset();
    this.formSubmitted = false;
    this.router.navigate(['/login']);
  }
}
