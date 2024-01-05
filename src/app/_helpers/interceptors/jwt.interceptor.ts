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
// import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public errorMessage!: any;
  public errorMessageList: string[] = [];
  static _accessToken: string;
  // private _refreshToken!: string;

  intercept(
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
    if (error.status) {
      this.errorMessage = error.error.detail;
      this._errorService.sendData(this.errorMessage);
      this._router.navigate(['/error']);
    } else {
      this.errorMessage = error.statusText;
      this._errorService.sendData(this.errorMessage);
      this._router.navigate(['/un-authorized']);
    }

    return throwError(() => error);
  };

  // End of Old Error Handler*************************

  constructor(
    private _jwtHelper: JwtHelperService,
    // private _store: Store<AuthenticationState>,
    private _errorService: ErrorService,
    private _router: Router
  ) {}
}
