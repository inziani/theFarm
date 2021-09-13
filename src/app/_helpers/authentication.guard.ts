import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, CanActivateChild, 
  CanDeactivate, 
  CanLoad, 
  Route, 
  Router, 
  RouterStateSnapshot, 
  UrlSegment, 
  UrlTree } 
  from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';

interface JwtPayload{
  user_id: number;
  username: string;
  email: string;
  exp: number

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //  User is not logged in so redirect the user to the login page with the return url
      if 
      (this.authenticationService.authenticated){
        return true;
      }
      else{
         // If user is logged in we return true and refresh the token
      // this.authenticationService.authenticated;
      // this.authenticationService.refreshedToken;
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      // this.authenticationService.onLogout;
      this.router.navigate(['login']);
      return false;

      }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
