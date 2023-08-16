import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from '../actions/authentication.actions';
import { catchError, map, of, concatMap, mergeMap, tap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { UsersService } from '@app/_helpers/services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '@app/shared/user-feedback-dialogues/login-dialog/login-dialog.component';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthenticationEffects {
  public jwtHelper = new JwtHelperService();
  

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

  public loadUserEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]CurrentUserId']),
      concatMap((action) =>
        this._userService.fetchSingleUser(action.userId).pipe(
          map((user) => {
            return AuthenticationActions['[Authentication]FetchUserSuccess']({
              user,
            });
          }),
          catchError((error: string) =>
            of(
              AuthenticationActions['[Authentication]FetchUserFailure']({
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
      ofType(AuthenticationActions['[Authentication]CurrentUserId']),
      concatMap((action) =>
        this._userService.fetchSingleUserProfile(action.userId).pipe(
          map((userProfiles) => {
            return AuthenticationActions[
              '[Authentication]FetchUserProfileSuccess'
            ]({ userProfile: userProfiles });
          }),
          catchError((error: string) =>
            of(
              AuthenticationActions['[Authentication]FetchUserProfileFailure']({
                errorMessage: error,
              })
            )
          )
        )
      )
    );
  });

  redirectToProfilePage = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          AuthenticationActions['[Authentication]UserLogInSucess']
        ),

        tap(() => {
          this._dialog.open(LoginDialogComponent);
          this._router.navigate(['/profile']);
        })
      ),
    { dispatch: false }
  );

  redirectToLoginPage = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          AuthenticationActions['[Authentication]UserLogOutSucess']
        ),

        tap(() => {
          this._router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _authenticationService: AuthenticationService,
    private _userService: UsersService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}
}
