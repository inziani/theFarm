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
import { ErrorService } from '@app/_helpers/services/error.service';
import { ErrorMessage } from '@app/shared/interfaces/http.interface';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UnauthorizedServeResponseComponent } from '@app/shared/user-feedback-dialogues/unauthorized-serve-response/unauthorized-serve-response.component';
import { ErrorHandlingDialogComponent } from '@app/shared/user-feedback-dialogues/error-handling-dialog/error-handling-dialog.component';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { selectJwtToken } from '@app/authentication/store/selectors/authentication.selector';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _financeService = inject(FinanceService);
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
    if (error.status === 0) {
      this.errorMessage = error.error.detail;
      console.log('Error Message - ', error.status);
      console.log('Error Message - ', error.error.detail);
      // this._financeService.sendData('unauthorized');
      let dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '550px';
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = this.errorMessage;
      let dialogRef = this._dialog.open(
        UnauthorizedServeResponseComponent,
        dialogConfig
      );
      dialogRef.afterClosed().subscribe({
        next: (result) => result,
        error: (err) =>
          this._dialog.open(ErrorHandlingDialogComponent, {
            data: err,
          }),
        complete: () => console.info('complete'),
      });
    }
    return throwError(() => error);
  };

  constructor(
    private _dialog: MatDialog,
    private _errorService: ErrorService,
    private _jwtHelper: JwtHelperService,
    private _store: Store<AuthenticationState>
  ) {}
}
