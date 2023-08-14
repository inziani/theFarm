import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { selectIsAuthenticated } from '@app/authentication/store/selectors/authentication.selector';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const route = inject(Router);
  return inject(Store<AuthenticationState>)
    .select(selectIsAuthenticated)
    .pipe(
      tap((isAuthenticated) => {
        !isAuthenticated && route.navigate(['unauthorized']);
      })
    );
};

export const canMatchModulesGuard: CanMatchFn = () => {
  const route = inject(Router);
  return inject(Store<AuthenticationState>)
    .select(selectIsAuthenticated)
    .pipe(
      tap((isAuthenticated) => {
        !isAuthenticated && route.navigate(['unauthorized']);
      })
    );
};
