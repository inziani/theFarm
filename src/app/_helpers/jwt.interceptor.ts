import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { concat, Observable, ReplaySubject, BehaviorSubject, throwError } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';

import { environment } from '@environments/environment';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accessToken!: string;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error!: HttpErrorResponse;

  constructor(
    private dataSource: RestDataSource,
    private authenticationService: AuthenticationService,
    private route: Router

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authenticationService.currentUser$.subscribe(token => {
      let tokenObj = JSON.parse(JSON.stringify(token));
      this.accessToken = tokenObj.access;
    })

    // if (this.dataSource.authToken)
   if (this.accessToken)
    {
        const cloned = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.accessToken}`
          }

        });
       return next.handle(cloned);
      }
      else {

        return next.handle(request);
      }
  }

}


