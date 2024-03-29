import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from '../actions/authentication.actions';
import { catchError, map, of, concatMap, tap, exhaustMap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { UsersService } from '@app/_helpers/services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { State } from '@app/store/state/ui.state';
import { UIActions } from '@app/store/actions/ui.actions';
import { JwtInterceptor } from '@app/_helpers/interceptors/jwt.interceptor';
import { JWTDecodedTokenInterface } from '@app/authentication/models/authentication.model';

@Injectable()
export class AuthenticationEffects {
  public jwtHelper = new JwtHelperService();

  public userLoginEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]UserLogIn']),
      concatMap((action) =>
        this._authenticationService
          .onLogOn(action.userLogin.email, action.userLogin.password)
          .pipe(
            map((jwtToken) => {
              JwtInterceptor._accessToken = jwtToken.access;
              localStorage.setItem('token', jwtToken.access);
              localStorage.setItem('refreshToken', jwtToken.refresh);
              const jwtDecodedToken: JWTDecodedTokenInterface | null =
                this.jwtHelper.decodeToken(jwtToken?.access);
              this._store.dispatch(
                AuthenticationActions['[Authentication]CurrentUserId']({
                  userId: jwtDecodedToken?.user_id,
                })
              );
              this._store.dispatch(
                UIActions['[UILoadingPage]StopLoading']({ isLoading: false })
              );
              return AuthenticationActions['[Authentication]UserLogInSucess']({
                jwtToken,
              });
            }),
            catchError((error: string) =>
              of(
                AuthenticationActions['[Authentication]UserLogInFail']({
                  errorMessage: error,
                })
              ).pipe(
                tap(() =>
                  this._store.dispatch(
                    UIActions['[UILoadingPage]StopLoading']({
                      isLoading: false,
                    })
                  )
                )
              )
            )
          )
      )
    );
  });

  public autoLoginEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthenticationActions['[Authentication]UserAutoLogin']),
      concatMap(() =>
        this._authenticationService.onRefreshPage().pipe(
          map((jwtToken) => {
            JwtInterceptor._accessToken = jwtToken.access;
            localStorage.setItem('token', jwtToken.access);
            localStorage.setItem('refreshToken', jwtToken.refresh);
            const jwtDecodedToken: JWTDecodedTokenInterface | null =
              this.jwtHelper.decodeToken(jwtToken?.access);
            this._store.dispatch(
              AuthenticationActions['[Authentication]CurrentUserId']({
                userId: jwtDecodedToken?.user_id,
              })
            );
            this._store.dispatch(
              UIActions['[UILoadingPage]StopLoading']({ isLoading: false })
            );
            return AuthenticationActions[
              '[Authentication]UserAutoLoginSuccess'
            ]({
              jwtToken,
            });
          }),
          catchError((error: string) =>
            of(
              AuthenticationActions['[Authentication]UserAutoLoginFailure']({
                errorMessage: error,
              })
            ).pipe(
              tap(() =>
                this._store.dispatch(
                  UIActions['[UILoadingPage]StopLoading']({
                    isLoading: false,
                  })
                )
              )
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
              }),
              UIActions['[UILoadingPage]StopLoading']({ isLoading: false })
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
              }),
              UIActions['[UILoadingPage]StopLoading']({ isLoading: false })
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
          ...[
            AuthenticationActions['[Authentication]UserLogInSucess'],
            AuthenticationActions['[Authentication]FetchUserSuccess'],
          ]
        ),

        tap(() => {
          this._router.navigate(['/profileUrl']);
        })
      ),
    { dispatch: false }
  );

  redirectToLoginPage = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthenticationActions['[Authentication]UserLogOutSucess']),
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
    private _dialog: MatDialog,
    private _store: Store<State>
  ) {}
}
