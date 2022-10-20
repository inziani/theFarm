import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatRadioChange } from '@angular/material/radio';

import { UsersService } from '@app/core/services/users.service';
import { Gender } from '@app/core/shared/interfaces/users-interface';
import { UserUpdateFormGroup } from '@app/core/shared/models/user-update-form.model';
import { User } from '@app/core/shared/models/user.model';
import { ObjectCreatedComponent } from '../object-created/object-created.component';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {
  @ViewChild(MatAccordion) public accordion!: MatAccordion;
  public userAction!: string;
  public errorMessage!: string;
  public formGroup = new UserUpdateFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public staffUser!: User;
  public gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
   ];
  public maxDate!: Date;
  public radioButtonsYes: string = 'True';
  public radioButtonsNo: string = 'False';
  public datePipe!: any;
  public displayEmployeeTemplate: boolean = true;



  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    private dateFormat: DatePipe
  ) {
    this.datePipe = dateFormat;
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.userService.data.subscribe({
      next: (userAction) => this.userAction = userAction,
      error: (err) => this.errorMessage = err,
      complete: () => console.log('Complete')
    })
  }

  public isStaff(change: MatRadioChange) {
    this.displayEmployeeTemplate = change.value;
  }

  public notStaff(change: MatRadioChange) {
    this.displayEmployeeTemplate = change.value;

  }

  onAddUser() {

    // Fetch data from the form and pass it along

    this.dialogRef.close(this.formGroup.value);
    this.staffUser = this.formGroup.value;

    // Post the data to the API for Posting

    this.userService.addUser(
      this.staffUser.username,
      this.staffUser.email,
      this.staffUser.first_name,
      this.staffUser.middle_name,
      this.staffUser.last_name,
      this.staffUser.phone_number,
      // this.staffUser.date_of_birth,
      this.datePipe.transform(this.staffUser.date_of_birth, 'yyyy-MM-dd'),
      this.staffUser.gender,
      this.staffUser.city,
      this.staffUser.country,
      this.staffUser.is_active,
      this.staffUser.is_superuser,
      this.staffUser.is_staff
    ).subscribe({
      next: (userCreated) => this.dialog.open(ObjectCreatedComponent, {
        data:
          this.staffUser.username = userCreated.username
      }),
      error: (err) => this.errorMessage = err,
      complete: ()=> console.log('Complete')
    })
  }
}
