import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignUpFormGroup } from '@app/shared/models/signupform.model';
import { SignUpCredentials } from '@app/shared/models/authentication.model';
import { Gender } from '@app/shared/interfaces/gender';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { User } from '@app/shared/models/user.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  gender: Gender[] = [
    { value: 'Female', viewValue: 'Female' },
    { value: 'Male', viewValue: 'Male' }
  ];

  // Form Data
  public formGroup = new SignUpFormGroup();
  public isLoading: boolean = false;
  public error!: string | null;
  public maxDate!: Date;
  public formSubmitted: boolean = false;

  // Logged in User data
  public user!: any;
  private userSubscription!: Subscription;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];
  public patchedUser!: any;
  public finalPatcherUser!:any;


  constructor(

    private dataSource : RestDataSource
  ) { }

  ngOnInit(): void {

    this.userSubscription = this.dataSource.user.subscribe(
      user => {

        this.user = user;
        this.loggedInUser = this.dataSource.fetchUsers().subscribe(users => {
          this.userList = users;
          this.loggedInUser = this.userList.filter((person: User) => person.id === this.user);
          this.currentLoggedInUser = this.loggedInUser;
          // this.patchedUser = { ...this.currentLoggedInUser };
          // this.patchedUser = this.currentLoggedInUser.reduce((username, firstName) => Object.assign(username, firstName), {});
          // this.finalPatcherUser = this.patchedUser;
          // this.patchedUser = Object.assign({}, ['id', 'username', 'first_name', 'last_name', 'date_of_birth', 'phone_numner',
          // 'email', 'gender', 'city']);
          this.patchedUser = this.currentLoggedInUser.reduce((...obj) => Object.assign(...obj), {});
          this.formGroup.patchValue({
            username: this.patchedUser.username,
            first_name: 'Valentine',
            last_name: this.patchedUser.last_name,
            email: this.patchedUser.email,

          });
          console.log('My logged in user - ', this.currentLoggedInUser);
          console.log('My Patched User -', this.patchedUser);
          console.log('My Form-', this.formGroup.value);
        });

      });



  }



  ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }

   submitForm() {

  }


}
