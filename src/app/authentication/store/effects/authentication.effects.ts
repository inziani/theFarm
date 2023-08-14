import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from '../actions/authentication.actions';
import { catchError, map, of, concatMap, mergeMap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { UsersService } from '@app/_helpers/services/users.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions$: Actions,
    private _authenticationService: AuthenticationService,
    private _userService: UsersService
  ) {}

  public userLoginEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]UserLogIn']),
      concatMap((action) =>
        this._authenticationService
          .onLogOnTest(action.userLogin.email, action.userLogin.password)
          .pipe(
            map(
              (jwtToken) =>
                AuthenticationActions['[Authentication]UserLogInSucess']({
                  jwtToken,
                })
              // routeAction.routeto('profile')
            ),
            catchError((error: string) =>
              of(
                AuthenticationActions['[Authentication]UserLogInFail']({
                  errorMessage: error,
                })
                // routeAction.routeto('login')
              )
            )
          )
      )
    );
  });

  public loadUsersEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]FetchUserList']),
      mergeMap(() =>
        this._userService.fetchUsers().pipe(
          map((users) => {
            return AuthenticationActions[
              '[Authentication]FetchUserListSuccess'
            ]({ users: users });
          }),
          catchError((error: string) =>
            of(
              AuthenticationActions['[Authentication]FetchUserListFailure']({
                errorMessage: error,
              })
            )
          )
        )
      )
    );
  });

  public loadUserProfilesEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]FetchUserProfileList']),
      mergeMap(() =>
        this._userService.fetchUserProfiles().pipe(
          map((userProfiles) => {
            return AuthenticationActions[
              '[Authentication]FetchUserProfileListSuccess'
            ]({ userProfiles: userProfiles });
          }),
          catchError((error: string) =>
            of(
              AuthenticationActions[
                '[Authentication]FetchUserProfileListFailure'
              ]({
                errorMessage: error,
              })
            )
          )
        )
      )
    );
  });
}
