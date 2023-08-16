import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError, catchError, map, switchMap } from 'rxjs';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorService } from '@app/_helpers/services/error.service';
import { ErrorMessage } from '@app/shared/interfaces/http.interface';

import {
  JWTDecodedTokenInterface,
  JwTAuthenticationResponseInterface,
} from '../authentication/models/authentication.model';
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
    // *******************New Code****************************************

    // var isTokenExpired = this._jwtHelper.isTokenExpired(
    //   localStorage.getItem('access_token')
    // );
    // const refreshToken: string = JSON.stringify(
    //   localStorage.getItem('refresh_token')
    // );

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
      this._authenticationService.onRefreshPage(this._refreshToken).pipe(
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
        } else if (error.status === 401) {
          // Object.values(this.errorMessage).forEach((message) => {
          //   this.errorMessageList.push(message);
          // this._errorService.logInErrorHandlingDialog('You not Logged In.');
          // });
          // alert('You are not logged in');
          // do nothing
        } else {
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

  constructor(
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _errorService: ErrorService,
    private _jwtHelper: JwtHelperService,
    private _store: Store<AuthenticationState>
  ) {}
}
