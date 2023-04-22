import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError, catchError, map, switchMap } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '@app/core/services/error.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorMessage } from '@app/core/shared/interfaces/http.interface';
import { environment } from '@environments/environment';


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

    // **************************Beginning of new Code************************

    if (request.url.indexOf(`${environment.jwtRefresh}`)) {
      return next.handle(request);
    }

    const data = this._authenticationService.userData();
    const accessToken = data?.access_token;
    if (accessToken) {
      if (this._authenticationService.isAuthTokenValid(accessToken)) {
        let modifiedReq = request.clone({
          headers: request.headers.append(
            'Authorization', `Bearer ${accessToken}`)
        });
        return next.handle(modifiedReq)
      }
      return this._authenticationService.generateRefreshTokens().pipe(
        switchMap((res: any) => {
          let modifiedReq = request.clone({
            headers: request.headers.append(
              'Authorization', `Bearer ${res.data.access_token}`)
          })
          return next.handle(modifiedReq)
        })
      )
    }


      // **************************End of New Code******************************

      // **********************Beginning of Old Code***********************
      // this.accessToken = this._authenticationService.getAccessToken();
      // if (this.accessToken) {
      //   request = request.clone({
      //     setHeaders: {
      //       Authorization: `Bearer ${this.accessToken}`,
      //     },
      //   });
      // }
      // if (!request.headers.has('Content-Type')) {
      //   request = request.clone({
      //     headers: request.headers.set('Content-Type', 'application/json'),
      //   });
      // }

      // request = request.clone({
      //   headers: request.headers.set('Accept', 'application/json'),
      // });

      // ************************End of Old Code****************************

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
          });
          this._errorService.openErrorHandlingDialog(this.errorMessageList);
          return throwError(() => error);
        })
      );
  }
}
