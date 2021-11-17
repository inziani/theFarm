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
  emptyToken: string = ''

  constructor(
    private dataSource: RestDataSource,

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
