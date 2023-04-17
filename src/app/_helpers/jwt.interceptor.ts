import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError, catchError, map } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '@app/core/services/error.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accessToken!: string;
  public error!: HttpErrorResponse;
  public refreshedToken!: any;

  constructor(
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _errorService: ErrorService

  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._dialog.open(LoadingSpinnerComponent);
    this.accessToken = this._authenticationService.getAccessToken();
    // 1. Append the token on any outgoing request
    if (this.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
    }

    return next
      .handle(request)
      .pipe(
        map((event: HttpEvent<Event>) => {
          if (event instanceof HttpResponse) {
            console.log('event----->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Zee Error-', error);
          let data = {
            reason: error.error,
            status: error.status,
          };
          this._errorService.openErrorHandlingDialog(data);
          return throwError(() => error);
        })
      );
  }
}













