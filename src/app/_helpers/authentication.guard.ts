import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  // ActivatedRouteSnapshot,
  // CanActivate, CanActivateChild,
  // CanDeactivate,
  // CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
 }
  from '@angular/router';

import { AuthenticationService } from '@app/core/services/authentication.service';

import { Observable } from 'rxjs';

interface JwtPayload{
  user_id: number;
  username: string;
  email: string;
  exp: number

}

// @Injectable({
//   providedIn: 'root'
// })

export const canActivate: CanActivateChildFn =
  (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authenticationService.isAuthenticated) {
    router.navigate(['login']);
    authenticationService.onLogout()
    return false;
  }
    const validRoles = route.data['authorities'] || [];
    const userData = authenticationService.userData;

    if (!validRoles.some((r: string) => r === userData?.userInfo?.role)) {
      router.navigate(['/'])

    }
    return true
  }



// export class AuthenticationGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

//   constructor(
//     private router: Router,
//     private authenticationService: AuthenticationService,
//     ){

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     // return true

//     // Old Code
//       if (this.authenticationService.isAuthenticated) {
//         return true;
//       } else {
//         // alert('You have no authorization for this page');
//         this.router.navigate(['login']);
//         return false;
//       }

//     // End of old code
//   }
//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // return true;
//     // Old CODE
//      if (this.authenticationService.isAuthenticated) {
//        return true;
//      } else {
//        //  alert('You have no authorization for this page');
//        this.router.navigate(['login']);
//        return false;
//      }
//     // end of old code
//   }
//   canDeactivate(
//     component: unknown,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

// }
