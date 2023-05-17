import { Injectable, OnInit, inject } from '@angular/core';
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
  endWith,
} from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { ErrorService } from '@app/core/services/error.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorMessage } from '@app/core/shared/interfaces/http.interface';
import { environment } from '@environments/environment';
import {
  JWTDecodedTokenInterface,
  JwTAuthenticationResponseInterface,
} from '@app/core/shared/interfaces/users-interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UnauthorizedServeResponseComponent } from '@app/shared/unauthorized-serve-response/unauthorized-serve-response.component';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _financeService = inject(FinanceService);
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
    // *******************New Code****************************************

    var isTokenExpired = this._jwtHelper.isTokenExpired(
      localStorage.getItem('access_token')
    );
    const refreshToken: string = JSON.stringify(
      localStorage.getItem('refresh_token')
    );

    if (!isTokenExpired) {
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
          console.log('Server down Message -', this.errorMessage.status);
          Object.values(this.errorMessage).forEach((message) => {
            this.errorMessageList.push(message);
          });
          console.log('I hope it gets here -', this.errorMessageList);
          if (
            this.errorMessageList.length &&
            this.errorMessageList[0] === 'true'
          ) {
            let dialogConfig = new MatDialogConfig();
            this._financeService.sendData('500');
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '550px';
            dialogConfig.hasBackdrop = true;
            dialogConfig.data = '500';

            let dialogRef = this._dialog.open(
              UnauthorizedServeResponseComponent,
              dialogConfig
            );
            dialogRef.afterClosed().subscribe({
              next: (result) => result,
              error: (err) =>
                this._dialog.open(ErrorHandlingDialogComponent, { data: err }),
              complete: () => console.info('complete'),
            });
          } else {
            this._errorService.openErrorHandlingDialog(this.errorMessageList);
          }

          return throwError(() => error);
        })
      );
    } else {
      this._authenticationService.onRefreshPage(refreshToken).pipe(
        switchMap((newTokens: JwTAuthenticationResponseInterface) => {
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
              if (
                this.errorMessageList.length &&
                this.errorMessageList[0] === 'true'
              ) {
                let dialogConfig = new MatDialogConfig();
                this._financeService.sendData('500');
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.width = '550px';
                dialogConfig.hasBackdrop = true;
                dialogConfig.data = '500';

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
              } else {
                this._errorService.openErrorHandlingDialog(
                  this.errorMessageList
                );
              }
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
        const parsedMessage: Object = JSON.parse(
          JSON.stringify(this.errorMessage)
        );
        if (Object.keys(parsedMessage)[0] === 'isTrusted') {
          // console.log('parsedObject -', Object.keys(parsedMessage)[0]);
          // console.log('ParsedMessage -', parsedMessage);
          // console.log('ErrorMessage -', this.errorMessage);
            let dialogConfig = new MatDialogConfig();
            this._financeService.sendData('500');
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '550px';
            dialogConfig.hasBackdrop = true;
            dialogConfig.data = '500';

            let dialogRef = this._dialog.open(
              UnauthorizedServeResponseComponent,
              dialogConfig
            );
            dialogRef.afterClosed().subscribe({
              next: (result) => result,
              error: (err) =>
                this._dialog.open(ErrorHandlingDialogComponent, { data: err }),
              complete: () => console.info('complete'),
            });
        }
        else
        {
          Object.values(this.errorMessage).forEach((message) => {
            this.errorMessageList.push(message);
          });
          this._errorService.openErrorHandlingDialog(this.errorMessageList);
        }
        return throwError(() => error);
      })
    );
  }

  private _errorHandler(error: HttpErrorResponse) {
    if (error.status === 500) {
      let dialogConfig = new MatDialogConfig();
      this._financeService.sendData('500');
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '550px';
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = '500';
      let dialogRef = this._dialog.open(
        UnauthorizedServeResponseComponent,
        dialogConfig
      );
      dialogRef.afterClosed().subscribe({
        next: (result) => result,
        error: (err) =>
          this._dialog.open(ErrorHandlingDialogComponent, { data: err }),
        complete: () => console.info('complete'),
      });
    } else {
    }
    this.errorMessage = error.error;
    Object.values(this.errorMessage).forEach((message) => {
      this.errorMessageList.push(message);
    });
    this._errorService.openErrorHandlingDialog(this.errorMessageList);
    return throwError(() => error);
  }
}
