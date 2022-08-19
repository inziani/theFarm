import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { concat, Observable, ReplaySubject, BehaviorSubject, throwError } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';


import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accessToken!: string;
  error!: HttpErrorResponse;

  constructor(
    private dataSource: RestDataSource,
    private authenticationService: AuthenticationService,
    private route: Router

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.accessToken = this.authenticationService.jwtAccessToken;
    // console.log('interceptor token-', this.accessToken, this.authenticationService.jwtAccessToken,
    // this.authenticationService.payload);


   if (this.accessToken)
    {
     const cloned = request.clone({
       setHeaders: {
         Authorization: `Bearer ${this.accessToken}`,

       }

     });

       return next.handle(cloned);
      }
      else {

        return next.handle(request);
      }
  }

}


