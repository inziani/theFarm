import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';
import { selectIsAuthenticated } from '@app/authentication/store/selectors/authentication.selector';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const route = inject(Router);
  const _store = inject(Store<AuthenticationState>);
  return inject(Store<AuthenticationState>)
    .select(selectIsAuthenticated)
    .pipe(
      tap((isAuthenticated) => {
        !isAuthenticated && route.navigate(['unauthorized']);
        // _store.dispatch(
        //   AuthenticationActions['[Authentication]Unauthorized']({
        //     navigationError: 'unauthorized'
        //   })
        // );
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
