import { Injectable } from '@angular/core';
import { UsersService } from '@app/_helpers/services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '../actions/user.actions';
import { catchError, mergeMap, map, of, concatMap } from 'rxjs';
// import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserEffects {
  public jwtHelper = new JwtHelperService();
  constructor(private _actions$: Actions, private _userService: UsersService) {}

  public loadUsersEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(UserActions['[User]RetrieveUserList']),
      mergeMap(() =>
        this._userService.fetchUsers().pipe(
          map((userList) => {
            return UserActions['[User]RetrieveUserListSuccess']({ userList });
          }),
          catchError((error: string) =>
            of(
              UserActions['[User]RetrieveUserListFail']({ errorMessage: error })
            )
          )
        )
      )
    );
  });
}
