import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { UserUpdateFormGroup } from '@app/authentication/models/user-update-form.model';
import { Gender } from '@app/shared/interfaces/users-interface';
import { User } from '@app/features/human-resources/models/user.model';

// import { Subscription } from 'rxjs';
// import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { UsersService } from '@app/_helpers/services/users.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  genders: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
  ];

  // Form Data
  public formGroup = new UserUpdateFormGroup();
  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public readonly!: boolean;

  // Logged in User data
  public user!: number;

  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];
  public patchedUser!: User;
  public datePipe!: any;
  public errorMessage!: string;

  constructor(
    private _userService: UsersService,

    private dialog: MatDialog,
    private dateFormat: DatePipe
  ) {
    this.datePipe = this.dateFormat;
  }

  ngOnInit(): void {
    this.readonly = true;
  }

  ngOnDestroy() {}

  submitForm() {
    this.patchedUser = this.formGroup.value;
    return this._userService
      .editUserInformation(
        this.patchedUser.id,
        this.patchedUser.first_name,
        this.patchedUser.middle_name,
        this.patchedUser.last_name,
        this.datePipe.transform(this.patchedUser.date_of_birth, 'yyyy-MM-dd'),
        this.patchedUser.phone_number,
        this.patchedUser.username,
        this.patchedUser.email,
        this.patchedUser.gender,
        this.patchedUser.city,
        this.patchedUser.country,
        this.patchedUser.is_active,
        this.patchedUser.is_superuser,
        this.patchedUser.is_staff,
        this.patchedUser.staffType
      )
      .subscribe({
        next: (patchedUser) =>
          this.dialog.open(ChangesSavedDialogComponent, {
            data: (this.patchedUser = patchedUser),
          }),
        error: (err) => {
          this.errorMessage = err;
        },
        complete: () => console.info('Complete'),
      });
  }

  public update(): void {
    this.readonly = !this.readonly;
    this.formGroup.controls.gender.enable();
    this.formGroup.controls.date_of_birth.enable();
  }
}
