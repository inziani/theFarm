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
import { RestDataSource } from '@app/shared/data/rest.datasource';

import { environment } from '@environments/environment';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  emptyToken: string = ''
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error!: HttpErrorResponse;

  constructor(
    private dataSource: RestDataSource,
    private route: Router

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     if (this.dataSource.authToken) {
        const cloned = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.dataSource.authToken}`
          }

        });
       return next.handle(cloned);
      }
      else {

        return next.handle(request);
      }
  }

}


