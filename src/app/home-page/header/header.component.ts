import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { User } from '@app/features/human-resources/models/user.model';
import { AuthenticationService } from '../../_helpers/services/authentication.service';
import { UsersService } from '@app/_helpers/services/users.service';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import {
  selectCurrentUserId,
  selectIsAuthenticated,
  selectUser,
} from '@app/authentication/store/selectors/authentication.selector';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  @Output() homePageNavToggle = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  public username!: string;
  public errorMessage!: string;
  public logInUserAction: string = 'login';
  public signUpUserAction: string = 'signup';
  public jwtHelper = new JwtHelperService();

  ngOnInit(): void {
    this._store.select(selectIsAuthenticated).subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });

    this._store.select(selectUser).subscribe({
      next: (user) => (this.username = user.username),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  public onLogIn() {
    this._userService.sendData(this.logInUserAction);
  }

  public onSignUp() {
    this._userService.sendData(this.signUpUserAction);
  }

  public onToggleSidenav() {
    this.sideNavToggle.emit();
  }

  public onHomePageSideNavToggle() {
    this.homePageNavToggle.emit();
  }

  public onLogOut() {
    this._authenticationService.onLogout();
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }
  constructor(
    private _authenticationService: AuthenticationService,
    private _userService: UsersService,
    private _store: Store<AuthenticationState>
  ) {}
}
