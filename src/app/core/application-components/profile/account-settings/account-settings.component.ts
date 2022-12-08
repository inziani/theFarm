import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { UserUpdateFormGroup } from '@app/core/shared/models/user-update-form.model';
import { Gender } from '@app/core/shared/interfaces/users-interface';
import { User } from '@app/core/shared/models/user.model';

import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { UsersService } from '@app/core/services/users.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  genders: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
  ];

  // Form Data
  public formGroup = new UserUpdateFormGroup();
  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public readonly!: boolean;

  // Logged in User data
  public user!: number;
  private userSubscription!: Subscription;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];
  public patchedUser!: User;
  public datePipe!: any;
  public errorMessage!: string;


  constructor(

    private userService: UsersService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private dateFormat: DatePipe

  ) {

    this.datePipe = dateFormat;
  }

  ngOnInit(): void {
    this.readonly = true;

    this.userSubscription = this.authenticationService.currentUser$.subscribe(
      user => {

        this.user = user;
        this.loggedInUser = this.userService.fetchUsers().subscribe(users => {
          this.userList = users;
          this.currentLoggedInUser = this.userList.filter((person: User) => person.id === this.user);
          this.patchedUser = this.currentLoggedInUser.reduce((...obj) => Object.assign(...obj),
          {
            id: NaN, first_name: '', middle_name: '', last_name: '', date_of_birth:'', phone_number: '', username: '',
            email: '', gender: '', city: '', country: '', is_active: true, staffType: 'string',  is_staff: true, is_superuser: false, date_joined: new Date(), password: ''
          });
          this.formGroup.patchValue(this.patchedUser );
        });

      });
  }

  ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }

  submitForm() {
    this.patchedUser = this.formGroup.value;
    return this.userService.editUserInformation(
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
    ).
      subscribe({
        next: (patchedUser) => this.dialog.open(ChangesSavedDialogComponent, { data: this.patchedUser = patchedUser }),
        error: (err) => { this.errorMessage = err },
        complete: () => console.info('Complete')
    });
   }

  public update(): void {
    this.readonly = !this.readonly;
    this.formGroup.controls.gender.enable();
    this.formGroup.controls.date_of_birth.enable();
  }

}
