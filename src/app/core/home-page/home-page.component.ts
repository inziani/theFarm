import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';
import { RestDataSource } from '../shared/data/rest.datasource';

import { UserInterface, UserProfileInterface } from '../shared/interfaces/users-interface';
import { AuthenticatedUser } from '../shared/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public testData: UserProfileInterface[] = [];
  public token!: string;
  public userFromUserService!: AuthenticatedUser;



  constructor(

    private sourceData: RestDataSource,
    private authenticationService: AuthenticationService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.sourceData.getAllUserProfiles().subscribe(data => {
      this.testData = data;
      console.log('TestData:' , this.testData);
    });

    this.authenticationService.currentUser$.subscribe(data => {
      let test = JSON.parse(JSON.stringify(data));
      this.token = test.access;
      console.log('header subjects', this.token);
    });


    this.userFromUserService = this.userService.decodedLoggedInUser;
    console.log('pulled userObject from user service', this.userFromUserService);

  }



}
