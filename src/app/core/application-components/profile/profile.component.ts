import { DatePipe } from '@angular/common';
import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  UserHobbiesUserUpdateFormGroup,
  UserProfilePictureUpdateFormGroup,
} from '@app/core/shared/models/user-update-form.model';
import {
  User,
  UserProfile,
} from '@app/core/shared/models/user.model';
import { Subscription, switchMap, tap, map, mapTo, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public itemSelected!: string;
  public formGroup = new UserUpdateFormGroup();
  public formGroupBio = new UserBioUserUpdateFormGroup();
  public formGroupHobbies = new UserHobbiesUserUpdateFormGroup();
  public formGroupProfilePicture = new UserProfilePictureUpdateFormGroup();
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
  public user!: number;
  public first_name!: string;
  public middle_name!: string;
  public last_name!: string;
  private _userSubscription!: Subscription;
  public patchedUser!: User;
  public userProfilePatchedUser!: UserProfile;
  public datePipe!: any;
  public errorMessage!: string;
  public upLoadPict: any;

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

  //  Profile picture upload data
  public selectedFiles?: FileList;
  public currentFile?: File;
  public progress = 0;
  public imageLoadStatusMessage = '';
  public imagePreview = '';
  public imageInfos?: Observable<any>;
  public imageSrc!: string;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    }),
  };

  // End of picture data

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
        }),
        switchMap((user) =>
          this._userService.fetchSingleUser(user).pipe(
            tap((currentLoggedInUser) => {
              this.patchedUser = currentLoggedInUser;
              this.first_name = this.patchedUser.first_name;
              this.middle_name = this.patchedUser.middle_name;
              this.last_name = this.patchedUser.last_name
              this.formGroup.patchValue(this.patchedUser);
            }),
            switchMap((user) =>
              this._userService.fetchSingleUserProfile(user.id).pipe(
                tap((currentLoggedInUserProfile) => {
                  this.userProfilePatchedUser = currentLoggedInUserProfile;
                  this.formGroupBio.patchValue(this.userProfilePatchedUser);
                  this.formGroupHobbies.patchValue(this.userProfilePatchedUser);
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
  // Test Code for image upload

  public onSelectPicture(event: any) {
    const reader = new FileReader();
    this.upLoadPict = event.target.files[0];

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.formGroupProfilePicture.patchValue({
          fileSource: this.upLoadPict,
        });
      };
    }
  }

  public submitPic() {
    alert('whatt?');
    const id = this.patchedUser.id;
    const profile_pic = this.upLoadPict;
    const file: File = profile_pic;

    return this._userService
      .uploadProfilePicture(
        this.patchedUser.id,
        this.userProfilePatchedUser.education_bio,
        this.userProfilePatchedUser.professional_bio,
        this.userProfilePatchedUser.professional_hobbies,
        this.userProfilePatchedUser.personal_hobbies,
        this.userProfilePatchedUser.social_hobbies,
        file
      )
      .subscribe({
        next: (file) => console.log('I have no clue whats going on!', file),
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.imageLoadStatusMessage = err.error.message;
          } else {
            this.imageLoadStatusMessage =
              'The Image upload process has failed. Please try again.';
          }
          this.currentFile = undefined;
        },
        complete: () => {
          console.info('Complete');
        },
      });
  }

  // End of test code for image upload

  public selectFile(event: any): void {
    this.imageLoadStatusMessage = '';
    this.imagePreview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.imagePreview = '';
        this.currentFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  public upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this._userService
          .uploadProfilePicture(
            this.patchedUser.id,
            this.userProfilePatchedUser.education_bio,
            this.userProfilePatchedUser.professional_bio,
            this.userProfilePatchedUser.professional_hobbies,
            this.userProfilePatchedUser.personal_hobbies,
            this.userProfilePatchedUser.social_hobbies,
            this.currentFile
          )
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.imageLoadStatusMessage = event.body.message;
                this.imageInfos = this._userService.getUserProfilePicture(
                  this.patchedUser.id
                );
                console.log('ProfilePictureListing - ', this.imageInfos);
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;

              if (err.error && err.error.message) {
                this.imageLoadStatusMessage = err.error.message;
              } else {
                this.imageLoadStatusMessage =
                  'The Image upload process has failed. Please try again.';
              }
              this.currentFile = undefined;
            },
            complete: () => {
              console.info('Complete');
            },
          });
      }
    }
    this.selectedFiles = undefined;
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

  // Method to update User Hobbies Form
  public submitUserProfileHobbiesForm() {
    this.userProfilePatchedUser = this.formGroupHobbies.value;
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
