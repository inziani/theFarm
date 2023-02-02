import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UsersService } from '@app/core/services/users.service';

import { ProfilePageGridInterface } from '@app/core/shared/interfaces/grids-interface';
import { Gender } from '@app/core/shared/interfaces/users-interface';
import {
  UserUpdateFormGroup,
  UserBioUserUpdateFormGroup,
} from '@app/core/shared/models/user-update-form.model';
import { User, UserProfile } from '@app/core/shared/models/user.model';
import { Subscription, switchMap, tap, map, mapTo } from 'rxjs';

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
  public formGroupBio = new UserBioUserUpdateFormGroup();
  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public readonly!: boolean;
  public isDisabled!: boolean;
  public gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' },
  ];

  // Logged in User data
  private _isAuthenticated!: boolean;
  public user!: number;
  private _userSubscription!: Subscription;
  private _$userProfilesSubscription!: Subscription;
  private _$userProfileSubscription!: Subscription;
  public userList!: User[];
  public loggedUser!: any;
  public currentLoggedInUser!: User[];
  public currentLoggedInUserProfile!: UserProfile;
  public patchedUser!: User;
  public datePipe!: any;
  public errorMessage!: string;
  public userProfilePatchedUser!: UserProfile;
  public userProfilePatchedUserList!: UserProfile[];

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
    this.isDisabled = true;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this._userSubscription = this._authenticationService.currentUser$
      .pipe(
        tap((user) => {
          this.user = user;
          console.log('No Retreat User Number-', this.user);
        }),
        switchMap((user) =>
          this._userService.fetchSingleUser(user).pipe(
            tap((currentLoggedInUser) => {
              this.patchedUser = currentLoggedInUser;
              this.formGroup.patchValue(this.patchedUser);
              console.log('UserObject- ', this.patchedUser);
            }),
            switchMap((user) =>
              this._userService.fetchSingleUserProfile(user.id).pipe(
                tap((currentLoggedInUserProfile) => {
                  this.userProfilePatchedUser = currentLoggedInUserProfile;
                  this.formGroupBio.patchValue(this.userProfilePatchedUser);
                  console.log(
                    'UserProfileObject-',
                    this.userProfilePatchedUser
                  );
                })
              )
            )
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._userSubscription.unsubscribe();
  }

  public update(): void {
    this.patchedUser = this.formGroup.value;
    this.userProfilePatchedUser = this.formGroupBio.value;
    console.log('patchProfile - ', this.userProfilePatchedUser);
    this.formSubmitted = !this.formSubmitted;
    this.isDisabled = !this.isDisabled;
  }

  public submitPersonalInformationForm() {
    this.patchedUser = this.formGroup.value;
    return this._userService
      .editUserInformation(
        this.patchedUser.id,
        this.patchedUser.username,
        this.patchedUser.email,
        this.patchedUser.first_name,
        this.patchedUser.middle_name,
        this.patchedUser.last_name,
        this.patchedUser.phone_number,
        this.datePipe.transform(this.patchedUser.date_of_birth, 'yyyy-MM-dd'),
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
            data: (this.patchedUser.username = patchedUser.username),
          }),
        error: (err) => {
          this.errorMessage = err;
        },
        complete: () => console.info('Complete'),
      });
  }

  // Method to update the user Bio information
  public submitUserProfileBioForm() {
    this.userProfilePatchedUser = this.formGroupBio.value;
    return this._userService
      .editSingleUserProfile(
        this.patchedUser.id,
        this.userProfilePatchedUser.education_bio,
        this.userProfilePatchedUser.professional_bio,
        this.userProfilePatchedUser.professional_hobbies,
        this.userProfilePatchedUser.personal_hobbies,
        this.userProfilePatchedUser.social_hobbies
      )
      .subscribe({
        next: (patchUserProfile) => {
          this._dialog.open(ChangesSavedDialogComponent, {
            data: this.patchedUser.username,
          });
        },
        error: (err) => {
          this.errorMessage = err;
        },
        complete: () => console.info('Complete'),
      });
  }

  public submitUserProfileHobbiesForm() {
    return this._userService.deleteSingleUser(this.patchedUser.id).subscribe({
      next: (userProfile) => {
        console.log('testing-', userProfile);
        this._dialog.open(ChangesSavedDialogComponent, {
          data: (this.patchedUser.username = this.patchedUser.username),
        });
      },
      error: (err) => (this.errorMessage = err),
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
