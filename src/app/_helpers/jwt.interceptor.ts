import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import {
  Observable,
  throwError,
  catchError,
  map,
  switchMap,
  Subscription,
} from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '@app/core/services/error.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorMessage } from '@app/core/shared/interfaces/http.interface';
import { environment } from '@environments/environment';
import { JWTDecodedTokenInterface, JwTAuthenticationResponseInterface } from '@app/core/shared/interfaces/users-interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // private accessToken: string = '';
  // private refreshedToken!: string;
  public errorMessage!: ErrorMessage;
  public errorMessageList: string[] = [];

  constructor(
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _errorService: ErrorService,
    private _jwtHelper: JwtHelperService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // ***************************Old Code***************************

    // console.log('Local Storage ', this._authenticationService.jwtTokens)

    // console.log('Local Storage Token in Intercept ', this.accessToken);
    // console.log('access token outside subscribe ', this.accessToken);
    // if (this.accessToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.accessToken}`,
    //     },
    //   });
    // }
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }

    // request = request.clone({
    //   headers: request.headers.set('Accept', 'application/json'),
    // });

    // ************************End of Old Code****************************

    // *******************New Code****************************************

    var isTokenExpired = this._jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
    const refreshToken: string = JSON.stringify(localStorage.getItem('refresh_token'));

    if (!isTokenExpired)
    {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return next.handle(request).pipe(
        map((event: HttpEvent<Event>) => {
          if (event instanceof HttpResponse) {
            // console.log('event----->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = error.error;
          Object.values(this.errorMessage).forEach((message) => {
            this.errorMessageList.push(message);
          });
          this._errorService.openErrorHandlingDialog(this.errorMessageList);
          return throwError(() => error);
        })
      );
    }
    else
    {
      // console.log('Expired Token should be here ', localStorage.getItem('access_token'));
      this._authenticationService.onRefreshPage(refreshToken).pipe(
        switchMap((newTokens: JwTAuthenticationResponseInterface) => {
          console.log('Old Refresh Token -', refreshToken)
          console.log('New Refresh Token -', newTokens);
          localStorage.setItem('reload_access_token', newTokens.access);
          localStorage.setItem('reload_refresh_token', newTokens.refresh);
          var loggedInUserData = this._jwtHelper.decodeToken(
            newTokens.access
          ) as JWTDecodedTokenInterface;
          this._authenticationService._loggedInUser$.next(loggedInUserData);

          const transformRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newTokens.access}`,
            },
          });
          return next.handle(transformRequest).pipe(
            map((event: HttpEvent<Event>) => {
              if (event instanceof HttpResponse) {
                console.log('event----->>>', event);
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              this.errorMessage = error.error;
              Object.values(this.errorMessage).forEach((message) => {
                this.errorMessageList.push(message);
              });
              this._errorService.openErrorHandlingDialog(this.errorMessageList);
              return throwError(() => error);
            })
          );
        })
      );
    }

    // ********************End of New Code********************************

    return next.handle(request).pipe(
      map((event: HttpEvent<Event>) => {
        if (event instanceof HttpResponse) {
          console.log('event----->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        Object.values(this.errorMessage).forEach((message) => {
          this.errorMessageList.push(message);
        });
        this._errorService.openErrorHandlingDialog(this.errorMessageList);
        return throwError(() => error);
      })
    );
  }
}
