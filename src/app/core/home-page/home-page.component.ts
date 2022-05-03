import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  public users: UserInterface[] = [];
  private userSubscription!: Subscription;
  public userser!: AuthenticatedUser;



  constructor(

    private sourceData: RestDataSource,
    private authenticationService: AuthenticationService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.sourceData.getAllUsers().subscribe(userData => {
      this.users = userData;
      console.log('TestData:', this.users);
    });

    this.userSubscription = this.authenticationService.currentUser$.subscribe(user => {
      this.userser = user;
    });


  }

   ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }


}
