import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanMatchFn,
  createUrlTreeFromSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
 }
  from '@angular/router';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { tap } from 'rxjs';



export const authenticationGuard: CanActivateFn = () => {
  const route = inject(Router)
  return inject(AuthenticationService).isLoggedOnData$
    .pipe(
      tap((isLoggedIn) => {
        console.log('Guard Response-', isLoggedIn);
        !isLoggedIn && route.navigate(['login']);
      })
    );
}

export const canMatchModulesGuard: CanMatchFn = () => {
  const route = inject(Router);
  return inject(AuthenticationService)
    .isLoggedOnData$
    .pipe(
      tap((isLoggedIn) => {
        console.log('Guard Response-', isLoggedIn);
        !isLoggedIn && route.navigate(['login']);
      })
    );

}


