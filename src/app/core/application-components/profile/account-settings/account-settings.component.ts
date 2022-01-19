import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserUpdateFormGroup } from '@app/core/shared/models/user-update-form.model';
// import { UseUpdate } from '@app/shared/models/authentication.model';
import { Gender } from '@app/core/shared/interfaces/gender';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { User } from '@app/core/shared/models/user.model';

import { Subscription } from 'rxjs';

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
  public error!: string | null;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public readonly!: boolean;

  // Logged in User data
  public user!: any;
  private userSubscription!: Subscription;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];
  public patchedUser!: User;



  constructor(

    private dataSource : RestDataSource
  ) { }

  ngOnInit(): void {
    this.readonly = true;

    this.userSubscription = this.dataSource.user.subscribe(
      user => {

        this.user = user;
        this.loggedInUser = this.dataSource.fetchUsers().subscribe(users => {
          this.userList = users;
          this.currentLoggedInUser = this.userList.filter((person: User) => person.id === this.user);
          this.patchedUser = this.currentLoggedInUser.reduce((...obj) => Object.assign(...obj),
          {
            id: NaN, first_name: '', last_name: '', date_of_birth:'', phone_number: '', username: '',
            email: '', gender: '', city: ''
          });
          this.formGroup.patchValue(this.patchedUser );
          console.log('My logged in user - ', this.currentLoggedInUser);
          console.log('My Patched User -', this.patchedUser);
          console.log('My Form-', this.formGroup.value);
        });

      });
  }

  ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }
  get first_name() {
    return this.formGroup.get('first_name')
  }
  get last_name() {
    return this.formGroup.get('first_name')
  }
  get date_of_birth() {
    return this.formGroup.get('date_of_birth')
  }
  get phone_number() {
    return this.formGroup.get('phone_number')
  }
  get username() {
    return this.formGroup.get('username')
  }
  get email() {
    return this.formGroup.get('email')
  }
  get gender() {
    return this.formGroup.get('gender')
  }
  get city() {
    return this.formGroup.get('city')
  }

  submitForm() {
    alert('the button is working');

   }

  update(): void {
    this.readonly = !this.readonly;
    this.formGroup.controls.gender.enable();
    this.formGroup.controls.date_of_birth.enable();
  }


}
