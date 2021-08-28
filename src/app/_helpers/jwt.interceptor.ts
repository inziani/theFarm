import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add authorization header with jwt token
    // const idToken = localStorage.getItem('id_token');
    const idToken = this.authenticationService.tokenId;
    if(idToken){
      const cloned = request.clone({
        setHeaders: { Authorization: `Bearer ${idToken}`}
      });
    
      return next.handle(cloned);
  }
    else{

      return next.handle(request);
  }
 }
}
