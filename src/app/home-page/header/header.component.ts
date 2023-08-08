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
  selectIsAuthenticated,
  selectJwtToken,
} from '@app/authentication/store/selectors/authentication.selector';
import {
  JWTDecodedTokenInterface,
  JwTAuthenticationResponseInterface,
} from '@app/authentication/models/authentication.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';
import { selectUserList } from '@app/features/human-resources/store/selectors/user.selector';
// import { selectJwtToken } from '@app/authentication/store/selectors/authentication.selector';

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
  public currentLoggedInUser!: User;
  public username!: string;
  // public userList!: User[]
  // public loggedInUser!: any;

  public errorMessage!: string;
  public logInUserAction: string = 'login';
  public signUpUserAction: string = 'signup';
  public jwtHelper = new JwtHelperService();
  constructor(
    private _authenticationService: AuthenticationService,
    private _userService: UsersService,
    private _store: Store<AuthenticationState>
  ) {}

  ngOnInit(): void {
    this._store.select(selectIsAuthenticated).subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });

    this._store.select(selectJwtToken).subscribe({
      next: (token) => {
        const jwtDecodeToken = this.jwtHelper.decodeToken(
          token?.access
        ) as JWTDecodedTokenInterface;
        this.user = jwtDecodeToken?.user_id;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed Token Fetching'),
    });
    this._store.select(selectJwtToken).pipe(
      map((tokenMap: JwTAuthenticationResponseInterface) => {
        const jwtDecodeToken = this.jwtHelper.decodeToken(
          tokenMap?.access
        ) as JWTDecodedTokenInterface;
        this.user = jwtDecodeToken?.user_id;
        console.log('UserId Mathogs - ', this.user);
        this._store.select(selectUserList).subscribe({
          next: (users) => {
            console.log('UserList Mathogs - ', users);
            // this.currentLoggedInUser = users.find(
            //   (user) => user.id === this.user
            // )!;
            // this.username = this.currentLoggedInUser.username;
            // console.log(
            //   'Mathogothanio currentLoggedInUser - ',
            //   this.currentLoggedInUser,
            //   this.username
            // );
            // console.log(
            //   'Mathogothanio - unsername ',

            //   this.username
            // );
          },
          error: (err) => (this.errorMessage = err),
          complete: () => console.info('Completed'),
        });
      })
    );
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
}
