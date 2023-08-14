import { Component, OnInit } from '@angular/core';

import {
  User,
  UserProfile,
} from '@app/features/human-resources/models/user.model';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from '@app/_helpers/services/users.service';

import { Observable, map, mapTo, switchMap, switchMapTo, tap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { DatePipe } from '@angular/common';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ProfilePageGridInterface } from '@app/shared/interfaces/grids-interface';
import { Gender } from '@app/shared/interfaces/users-interface';
import {
  UserBioUserUpdateFormGroup,
  UserHobbiesUserUpdateFormGroup,
  UserProfilePictureUpdateFormGroup,
  UserUpdateFormGroup,
} from '@app/authentication/models/user-update-form.model';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { selectJwtToken } from '@app/authentication/store/selectors/authentication.selector';
import { JWTDecodedTokenInterface } from '@app/authentication/models/authentication.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent implements OnInit {
  public jwtHelper = new JwtHelperService();
  //  Start of Bio
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
  public imageUrl!: string;
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
  public pictureLoadingSuccess!: string;

  // End of picture data

  // End of Bio

  constructor(
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _dateFormat: DatePipe,
    private _userService: UsersService,
    private _store: Store<AuthenticationState>
  ) {
    this.datePipe = _dateFormat;
  }

  ngOnInit(): void {
    this.readonly = true;
    this.isDisabled = true;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this._authenticationService._loggedInUserData$
      .pipe(
        tap((user) => {
          this.user = user.user_id;
        }),
        switchMap((user) =>
          this._userService.fetchSingleUser(user.user_id).pipe(
            tap((currentLoggedInUser) => {
              this.patchedUser = currentLoggedInUser;
              this.first_name = this.patchedUser.first_name;
              this.middle_name = this.patchedUser.middle_name;
              this.last_name = this.patchedUser.last_name;
              this.formGroup.patchValue(this.patchedUser);
            }),
            switchMap((user) =>
              this._userService.fetchSingleUserProfile(user.id).pipe(
                tap((currentLoggedInUserProfile) => {
                  this.userProfilePatchedUser = currentLoggedInUserProfile;
                  this.formGroupBio.patchValue(this.userProfilePatchedUser);
                  this.formGroupHobbies.patchValue(this.userProfilePatchedUser);
                  this.imageUrl = currentLoggedInUserProfile.profile_pic;
                })
              )
            )
          )
        )
      )
      .subscribe();

  
    this._store.select(selectJwtToken).subscribe({
      next: (token) => {
        const jwtDecodeToken = this.jwtHelper.decodeToken(
          token?.access
        ) as JWTDecodedTokenInterface;
        this.user = jwtDecodeToken?.user_id;
        console.log('Admin Page user', this.user);
        console.log('Admin Page token', token);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed Token Fetching'),
    });

    this._store
      .select(selectJwtToken)
      .pipe(
        map((token) => {
          const jwtDecodedToken = this.jwtHelper.decodeToken(token?.access);
          this.user = jwtDecodedToken?.user_id;
          console.log('RxJS Operators Token - ', jwtDecodedToken);
          console.log('RxJS Operators userId - ', this.user);
          this._store.dispatch(
            AuthenticationActions['[Authentication]CurrentUserId']({
              userId: this.user,
            })
          );
        }),
        tap((_userId) => {
          console.log('Is the Swtich Map working -', _userId);
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {}
  public selectFile(event: any): void {
    this.imageLoadStatusMessage = '';
    this.imagePreview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    console.log('Selected Files', this.selectedFiles);

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.imagePreview = '';
        this.currentFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  public uploadPicture(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this._userService
          .uploadProfilePicture(this.patchedUser.id, this.currentFile)
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.imageLoadStatusMessage = event.body.message;
              }
            },
            error: (err: any) => {
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
    this.imagePreview = '';
    this._dialog.open(ChangesSavedDialogComponent, {
      data: (this.pictureLoadingSuccess = 'The Picture'),
    });
  }

  // End of profile picture upload

  public update(): void {
    this.patchedUser = this.formGroup.value;
    this.userProfilePatchedUser = this.formGroupBio.value;
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
