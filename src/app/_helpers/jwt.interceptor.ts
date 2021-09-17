import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { concat, Observable, ReplaySubject } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { RestDataSource } from '@app/shared/data/rest.datasource';

import { environment } from '@environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // private ready$ = new ReplaySubject<void>(1);
  // private authenticationService!: AuthenticationService;
  // private token!: string;


  constructor(
    private dataSource: RestDataSource,
  
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Add authorization header with jwt token
    // this.token = this.dataSource.authToken;
    // console.log(this.token);
    if(this.dataSource.authToken){
      const cloned = request.clone({
        setHeaders: { Authorization: `Bearer ${this.dataSource.authToken}`}
      });
    
      return next.handle(cloned);
  }
    else{
      // const refreshed = request.clone({
      //   setHeaders:{ Authorization: `Bearer ${this.dataSource.refreshToken()}`}
      // })

      // return next.handle(refreshed);
      return next.handle(request);
      
    
  }
 }
}
