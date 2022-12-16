import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '@app/core/services/users.service';
import { Gender, StaffType } from '@app/core/shared/interfaces/users-interface';
import {
  UserUpdateFormGroup,
  EmployeeIDInformationFormGroup,
} from '@app/core/shared/models/user-update-form.model';
import {
  User,
  EmployeeIDInformation,
} from '@app/core/shared/models/user.model';
import { ChangesSavedDialogComponent } from '../changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ErrorHandlingDialogComponent } from '../error-handling-dialog/error-handling-dialog.component';
import { ObjectCreatedComponent } from '../object-created/object-created.component';


@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css'],
})
export class UserUpdateDialogComponent implements OnInit {
  @ViewChild(MatAccordion) public accordion!: MatAccordion;
  public userAction!: string;
  public errorMessage!: string;
  public formGroup = new UserUpdateFormGroup();
  public formGroupStaffId = new EmployeeIDInformationFormGroup();
  public staffUser!: User;
  public staffUserId!: EmployeeIDInformation;
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
  ];
  public staffType: StaffType[] = [
    { value: 'Contract', viewValue: 'Contract' },
    { value: 'Permanent', viewValue: 'Permanent' },
    { value: 'Not Applicable', viewValue: 'Not Applicable' },
  ];
  public maxDate!: Date;
  public radioButtonsYes: string = 'True';
  public radioButtonsNo: string = 'False';
  public datePipe!: any;
  public displayEmployeeTemplate: boolean = true;
  public createdUser!: string;
  public changedUser!: string;
  public deletedUser!: string;
  public isDisabled: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogueData: User,
    private _userService: UsersService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    private _router: Router,
    private _dateFormat: DatePipe
  ) {
    this.datePipe = _dateFormat;
  }

  ngOnInit(): void {
    this.readonly = true;
    this.staffUser = this.dialogueData;
    this.formGroup.patchValue(this.staffUser);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this._userService.data.subscribe({
      next: (userAction) => (this.userAction = userAction),
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('Complete'),
    });
  }

  /*
   ========This code will be moved to the HR  module to edit staff information once a user has been created=======

   (change)="isStaff($event)" - Change event to be put on the YES Radio button for is_staff
   (change)="notStaff($event)" - Change even to be put on the NO Radio Button for is_staff

  public isStaff(change: MatRadioChange) {
    this.displayEmployeeTemplate = change.value;
  }

  public notStaff(change: MatRadioChange) {
    this.displayEmployeeTemplate = change.value;
  }

  ===========End of Code to be moved=============================================================================
*/

  public onAddEmployeeId() {
    alert('Is this code getting called?');
    // Fetch data from the form and pass it along
    this._dialogRef.close(this.formGroupStaffId.value);
    this.staffUserId = this.formGroupStaffId.value;
    // Post the data to the API for posting
    this._userService.addUserId(
      this.staffUserId.identificationDocument,
      this.staffUserId.IdentificationNumber,
      this.staffUserId.taxNumber,
      this.staffUserId.startDate,
      this.staffUserId.endDate
    ).subscribe;
  }

  public onAddUser() {
    // Fetch data from the form and pass it along
    this._dialogRef.close(this.formGroup.value);
    this.staffUser = this.formGroup.value;
    // Post the data to the API for Posting
    this._userService
      .addUser(
        this.staffUser.username,
        this.staffUser.email,
        this.staffUser.first_name,
        this.staffUser.middle_name,
        this.staffUser.last_name,
        this.staffUser.phone_number,
        this.datePipe.transform(this.staffUser.date_of_birth, 'yyyy-MM-dd'),
        this.staffUser.gender,
        this.staffUser.city,
        this.staffUser.country,
        this.staffUser.is_active,
        this.staffUser.is_superuser,
        this.staffUser.is_staff,
        this.staffUser.staffType,
        this.staffUser.password
      )
      .subscribe({
        next: (userCreated) =>
          this._dialog.open(ObjectCreatedComponent, {
            data: (this.staffUser.username = userCreated.username),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.log('Complete'),
      });
    this.isLoading = false;
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onSubmit() {
    // Fetch data from the form and pass it along
    this._dialogRef.close(this.formGroup.value);
    this.staffUser = this.formGroup.value;
    // Check if the user being added is a staff member
    if (this.staffUser.staffType === 'Permanent') {
      alert('Staff is True and Permanent');
      this.onAddUser();
      this.onAddEmployeeId();
      this.isLoading = false;
      this.formGroup.reset();
      this.formSubmitted = false;
    } else {
      alert('staff is Contract or Not Applicable');
      console.log(this.staffUser.staffType);
      this.onAddUser();
      // this.onAddEmployeeId
      this.isLoading = false;
      this.formGroup.reset();
      this.formSubmitted = false;
    }
  }

  public onEditUser() {
    // Fetch data from the form and pass it along
    this._dialogRef.close(this.formGroup.value);
    this.staffUser = this.formGroup.value;
    // Post the data to the API for Posting

    this._userService
      .editUserInformation(
        this.dialogueData.id,
        this.staffUser.username,
        this.staffUser.email,
        this.staffUser.first_name,
        this.staffUser.middle_name,
        this.staffUser.last_name,
        this.staffUser.phone_number,
        this.datePipe.transform(this.staffUser.date_of_birth, 'yyyy-MM-dd'),
        this.staffUser.gender,
        this.staffUser.city,
        this.staffUser.country,
        this.staffUser.is_active,
        this.staffUser.is_superuser,
        this.staffUser.is_staff,
        this.staffUser.staffType
      )
      .subscribe({
        next: (userChanged) =>
          this._dialog.open(ChangesSavedDialogComponent, {
            data: (this.staffUser.username = userChanged.username),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.log('Complete'),
      });
    this.isLoading = false;
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onDeleteUser() {
    this._userService.deleteSingleUser(this.staffUser.id).subscribe({
      next: (deletedUser) =>
        this._dialog.open(DeleteDialogComponent, {
          data: (this.deletedUser = this.staffUser.username),
        }),
      error: (err) =>
        this._dialog.open(ErrorHandlingDialogComponent, {
          data: (this.errorMessage = err),
        }),
      complete: () => console.info('Completed'),
    });
  }
}
