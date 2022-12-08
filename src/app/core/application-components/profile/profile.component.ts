import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UsersService } from '@app/core/services/users.service';


import { ProfilePageGridInterface } from '@app/core/shared/interfaces/grids-interface';
import { Gender } from '@app/core/shared/interfaces/users-interface';
import { UserUpdateFormGroup } from '@app/core/shared/models/user-update-form.model';
import { User } from '@app/core/shared/models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public loggedInUser: string = 'Valentine Robai Inziani';
  public color = '#fb8500';
  public itemSelected!: string;
  public formGroup = new UserUpdateFormGroup();
  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public readonly!: boolean;
public gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
];


  // Logged in User data
  public user!: number;
  private userSubscription!: Subscription;
  public userList!: User[];
  public currentLoggedInUser!: User[];
  public patchedUser!: User;
  public datePipe!: any;
  public errorMessage!: string;

  public tiles: ProfilePageGridInterface[] = [
    { text: 'Three', cols: 2, rows: 8 },
    { text: 'One', cols: 3, rows: 3 },
    { text: 'Two', cols: 3, rows: 5 },
  ];

  public profileItems = [
    { item: 'Account settings' },
    { item: 'Roles and Authorizations' },
    { item: 'Password and security' },
  ];

  constructor(
    private _userService: UsersService,
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _dateFormat: DatePipe
  ) {
    this.datePipe = _dateFormat;
  }

  ngOnInit(): void {
    this.readonly = true;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  public update(): void {
    this.readonly = !this.readonly;
    this.formGroup.controls.gender.enable();
    this.formGroup.controls.date_of_birth.enable();
  }

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
          this._dialog.open(ChangesSavedDialogComponent, {
            data: (this.patchedUser = patchedUser),
          }),
        error: (err) => {
          this.errorMessage = err;
        },
        complete: () => console.info('Complete'),
      });
  }

  public onSelectPersonalInformation() {
    this.itemSelected = 'personalInformation';
  }

  public onSelectInterests() {
    this.itemSelected = 'interests';
  }

  public onSelectBio() {
    this.itemSelected = 'bio';
  }

  public onSelectWorkAndPlay() {
    this.itemSelected = 'workAndPlay';
  }

  public onSelectSettings() {
    this.itemSelected = 'settings';
  }
}
