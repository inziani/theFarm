import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, switchMap } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';


import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accessToken!: string;
  public error!: HttpErrorResponse;
  public refreshedToken!: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router

  ) { }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Brearer ${token}`,
      },
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessToken = this.authenticationService.getAccessToken();
    if (this.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
    }
    return next.handle(request);
      // .pipe(catchError(this.handleError)); Call the error handler here.
  }

  private handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler) {
    return this.authenticationService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        this.refreshedToken = this.authenticationService.token;
        return next.handle(this.addToken(request, this.refreshedToken));
      }));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    let errorHandled: boolean;
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);

  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
    errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
    switch (error.status) {
      case 400:
        alert('Bad request');
        this.router.navigate(['/home']);
        console.log('redirect to home');
        errorHandled = true;
        break;
      case 401:
        this.router.navigate(['/login']);
        errorHandled = true;
        console.log('redirect to login');
        break;
      case 403:
        this.router.navigate(['/home']);
        console.log('redirect to home');
        errorHandled = true;
        break;
      case 500:
        alert('The system is unavailable');
        console.log('redirect to home');
        this.router.navigate(['/home']);
        errorHandled = true;
        break;
    }
  }
  // Return an observable with a user-facing error message.
    errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
  return throwError(() => new Error(errorMessage));
}
}













