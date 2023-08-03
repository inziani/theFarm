import { Injectable } from '@angular/core';
import { UsersService } from '@app/_helpers/services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from '../actions/authentication.actions';
import { catchError, mergeMap, map, of, concatMap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserEffects {
  public jwtHelper = new JwtHelperService();
  constructor(
    private _actions$: Actions,
    private _authenticationService: AuthenticationService
  ) {}

  public userLoginEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]UserLogIn']),
      concatMap((action) =>
        this._authenticationService
          .onLogOnTest(
            action.userLogInCredentials.email,
            action.userLogInCredentials.password
          )
          .pipe(
            map((jwtToken) =>
              AuthenticationActions['[Authentication]UserLogInSucess']({
                jwtToken,
              })
            ),
            catchError((error: string) =>
              of(
                AuthenticationActions['[Authentication]UserLogInFail']({
                  errorMessage: error,
                })
              )
            )
          )
      )
    );
  });
}
