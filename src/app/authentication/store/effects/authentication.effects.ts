import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from '../actions/authentication.actions';
import { catchError, map, of, concatMap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';


@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions$: Actions,
    private _authenticationService: AuthenticationService
  ) {}

  public userLoginEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]UserLogIn']),
      concatMap((action) =>
        this._authenticationService
          .onLogOnTest(action.userLogin.email, action.userLogin.password)
          .pipe(
            map((jwtToken) =>
              AuthenticationActions['[Authentication]UserLogInSucess']({
                jwtToken,
              }),
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
