import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

// import { Store } from '@ngrx/store';
// import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
// import { selectJwtToken } from '@app/authentication/store/selectors/authentication.selector';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';
// import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public errorMessage!: any;
  public errorMessageList: string[] = [];
  static _accessToken: string;
  static _refreshToken: string;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isTokenExpired = this._jwtHelper.isTokenExpired(
      JwtInterceptor._accessToken
    );
    if (!isTokenExpired) {
      console.log('isTokenExpired', isTokenExpired);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JwtInterceptor._accessToken}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((errorData) => {
        if (errorData.status === 401) {
          console.log('isTokenExpiredInErrorHandler?', isTokenExpired);
          AuthenticationActions['[Authentication]UserAutoLogin']();
          console.log('is it getting refreshed ', errorData);
          return next.handle(request);
        }
        return throwError(() => errorData);
      })
    );

    // *****************************************************************************
    // if (!isTokenExpired) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${JwtInterceptor._accessToken}`,
    //     },
    //     withCredentials: true,
    //   });
    //   return next.handle(request).pipe(catchError(this._errorHandler));
    // }

    // return next.handle(request).pipe(catchError(this._errorHandler));
    // ********************************************************************************
  }

  // Refresh Tokens

  private _interceptRefreshToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isTokenExpired = this._jwtHelper.isTokenExpired(
      JwtInterceptor._accessToken
    );
    if (!isTokenExpired) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JwtInterceptor._accessToken}`,
        },
        withCredentials: true,
      });
      return next.handle(request).pipe(catchError(this._errorHandler));
    }
    return next.handle(request).pipe(catchError(this._errorHandler));
  }

  // Error Handler Old *****************************************

  private _errorHandler = (error: HttpErrorResponse) => {
    this.errorMessage = error.error.detail;
    this._errorService.sendData(this.errorMessage);
    console.log('ErrorMessageInterceptor -');
    // if (error.status) {
    //   this.errorMessage = error.error.detail;
    //   this._errorService.sendData(this.errorMessage);
    //   this._router.navigate(['/error']);
    // } else {
    //   this.errorMessage = error.statusText;
    //   this._errorService.sendData(this.errorMessage);
    //   this._router.navigate(['/un-authorized']);
    // }

    return throwError(() => error);
  };

  // End of Old Error Handler*************************

  constructor(
    private _jwtHelper: JwtHelperService,
    private _errorService: ErrorService,
    private _router: Router // private _store: Store<AuthenticationState>,
  ) {}
}
