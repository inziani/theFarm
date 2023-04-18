import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError, catchError, map } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '@app/core/services/error.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorMessage } from '@app/core/shared/interfaces/http.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accessToken!: string;
  public error!: HttpErrorResponse;
  public refreshedToken!: any;
  public errorMessage!: ErrorMessage;
  public errorMessageList: string[] = [];

  constructor(
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.accessToken = this._authenticationService.getAccessToken();
    // 1. Append the token on any outgoing request
    if (this.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

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
          this._errorService.openErrorHandlingDialog(this.errorMessageList);
        });
        return throwError(() => error);
      })
    );
  }
}
