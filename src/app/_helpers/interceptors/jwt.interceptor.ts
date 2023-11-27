import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, catchError } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorMessage } from '@app/shared/interfaces/http.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { UnauthorizedServeResponseComponent } from '@app/shared/user-feedback-dialogues/unauthorized-serve-response/unauthorized-serve-response.component';
// import { ErrorHandlingDialogComponent } from '@app/shared/user-feedback-dialogues/error-handling-dialog/error-handling-dialog.component';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { selectJwtToken } from '@app/authentication/store/selectors/authentication.selector';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { ErrorsComponent } from '@app/errors/errors.component';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public errorMessage!: ErrorMessage;
  public errorMessageList: string[] = [];
  private _accessToken!: string;
  private _refreshToken!: string;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._store.select(selectJwtToken).subscribe({
      next: (token) => {
        this._accessToken = token.access;
        this._refreshToken = token.refresh;
      },
    });

    const isTokenExpired = this._jwtHelper.isTokenExpired(this._accessToken);

    if (!isTokenExpired) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._accessToken}`,
        },
      });
      return next.handle(request).pipe(catchError(this._errorHandler));
    }
    return next.handle(request).pipe(catchError(this._errorHandler));
  }

  private _errorHandler = (error: HttpErrorResponse) => {
    if (error.status) {
      this.errorMessage = error.error.detail;
      this._errorService.sendData(this.errorMessage);
      console.log('ErrorMessageInInterceptor - ', this.errorMessage);
      this._router.navigate(['/error']);

      // Begining of Dialogue component
      // let dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      // dialogConfig.autoFocus = true;
      // dialogConfig.width = '550px';
      // dialogConfig.hasBackdrop = true;
      // dialogConfig.data = this.errorMessage;
      // let dialogRef = this._dialog.open(ErrorsComponent, dialogConfig);
      // dialogRef.afterClosed().subscribe({
      //   next: (result) => result,
      //   error: (err) =>
      //     this._dialog.open(ErrorsComponent, {
      //       data: err,
      //     }),
      //   complete: () => console.info('complete'),
      // });

      // End of Dialogue Component
    } else {
      this._errorService.sendData('The Server is Un-available');
      this._router.navigate(['/error']);

      // let dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      // dialogConfig.autoFocus = true;
      // dialogConfig.width = '550px';
      // dialogConfig.hasBackdrop = true;
      // dialogConfig.data = 'The server is un-available';
      // let dialogRef = this._dialog.open(ErrorsComponent, dialogConfig);
      // dialogRef.afterClosed().subscribe({
      //   next: (result) => result,
      //   error: (err) =>
      //     this._dialog.open(ErrorsComponent, {
      //       data: err,
      //     }),
      //   complete: () => console.info('complete'),
      // });
    }
    return throwError(() => error);
  };

  constructor(
    private _dialog: MatDialog,
    private _jwtHelper: JwtHelperService,
    private _store: Store<AuthenticationState>,
    private _errorService: ErrorService,
    private _router: Router
  ) {}
}
