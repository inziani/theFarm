import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accessToken!: string;
  public error!: HttpErrorResponse;
  public refreshedToken!: any;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog

  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessToken = this.authenticationService.getAccessToken();
    if (this.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
    }
    return next.handle(request)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
    switch (error.status) {
      case 400:
        errorMessage = 'An object with the same identification code already exists'
        break;
      case 401:
        errorMessage = 'You have entered a wrong email or password. Please correct your entries and try again.'
        break;
      case 403:
        errorMessage = 'You have no authorization for this page.'
        break;
      case 500:
        errorMessage = 'The server is unavailable'
        break;
    }
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error(errorMessage));
  }
}













