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
// import { Platform }  from '@ionic/angular';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private ready$ = new ReplaySubject<void>(1);
  private authenticationService!: AuthenticationService;
  private token!: string;


  constructor(
    private dataSource: RestDataSource,
    private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add authorization header with jwt token
    this.authenticationService = this.injector.get(AuthenticationService);
    this.token = this.dataSource.authToken;
    // console.log(this.token);
    if(this.token){
      const cloned = request.clone({
        setHeaders: { Authorization: `Bearer ${this.token}`}
      });
    
      return next.handle(cloned);
  }
    else{

      return next.handle(request);
    
  }
 }
}
