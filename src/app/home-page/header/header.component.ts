import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/features/human-resources/models/user.model';

import { AuthenticationService } from '../../_helpers/services/authentication.service';
import { UsersService } from '@app/_helpers/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  @Output() homePageNavToggle = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  public user!: number;
  public userList!: User[];
  public loggedInUser!: any;
  public currentLoggedInUser!: User[];
  public errorMessage!: string;
  public logInUserAction: string = 'login';
  public signUpUserAction: string = 'signup';

  constructor(
    private _authenticationService: AuthenticationService,
    private _route: Router,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    this._authenticationService._loggedInUserData$.subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser.user_id;
        this.isAuthenticated = !!this.user;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info(),
    });
  }

  // public onSignUp() {
  //   this._route.navigate(['signup']);
  // }

  public onLogIn() {
    this._userService.sendData(this.logInUserAction);
  }

  public onSignUp() {
    this._userService.sendData(this.signUpUserAction);
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }

  onHomePageSideNavToggle() {
    this.homePageNavToggle.emit();
  }

  onLogOut() {
    this._authenticationService.onLogout();
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }
}
